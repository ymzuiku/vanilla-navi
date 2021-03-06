import queryString from "querystring-number";

export interface IPaths {
  path: string;
  params?: { [key: string]: any };
  hash: string;
}

export interface IListen {
  path: string;
  params?: { [key: string]: any };
}

export interface IDetail {
  isPopBlock: boolean;
  division: string;
  rootElement: HTMLElement;
  paths: [IPaths];
  navis: { [key: string]: any };
  listenFunctions: { [key: number]: (options: IListen) => any };
  listenFunctionKey: number;
  routers: { [key: string]: any };
  initData: { path: string; params?: { [key: string]: any } };
}

export interface INavi {
  root: HTMLElement;
  canPop: () => boolean;
  push: (path: string, params?: { [key: string]: any }) => any;
  pop: () => any;
  listen: (fn: (options: IListen) => any) => any;
  detail: IDetail;
  use: (
    path: string,
    component: (...args: any[]) => any,
    delayAutoLoad?: number,
    importName?: string
  ) => any;
  init: (path: string, params?: { [key: string]: any }) => any;
  hashParse: (hash: string) => [string, any];
  hashStringify: (path: string, params?: { [key: string]: any }) => string;
}

const isWechat = /MicroMessenger/.test(navigator.userAgent);

const detail: IDetail = {
  isPopBlock: false,
  initData: null as any,
  routers: {},
  division: "#",
  paths: [] as any,
  rootElement: document.createElement("div"),
  navis: {},
  listenFunctions: {} as any,
  listenFunctionKey: 0
};

// 设置根页面的基本样式
detail.rootElement.style.width = "100%";
// detail.rootElement.style.maxWidth = "100vw";
// detail.rootElement.style.overflowX = "hidden";
detail.rootElement.style.height = "100%";
detail.rootElement.id = "navi-root";

function pushState(data: any, title: string, url: string) {
  if (isWechat) {
    window.history.replaceState(
      "wechat",
      "",
      hashStringify(detail.initData.path, detail.initData.params)
    );
  } else {
    window.history.pushState(data, title, url);
  }
}

// 初始化页面，如果有路由
function init(path: string, params?: { [key: string]: any }) {
  if (!detail.initData) {
    detail.initData = { path, params };
  }

  const hash = window.location.hash;
  let realPath;
  let realParams;

  // 如果浏览器有目标路径，推进第二层路由
  if (hash) {
    const pp = hashParse();
    realPath = pp[0];
    realParams = pp[1];
  }

  push(path, params);

  if (
    realPath &&
    JSON.stringify({ path, params }) !==
      JSON.stringify({ path: realPath, params: realParams })
  ) {
    push(realPath, realParams);
  }
}

async function push(path: string, params?: { [key: string]: any }) {
  if (detail.routers[path] === undefined) {
    push(detail.initData.path, detail.initData.params);
    return;
  }
  if (detail.paths.length > 0 && detail.paths[detail.paths.length-1].path === path) {
    return;
  }

  const url = hashStringify(path, params);

  function pushEnd(ele: HTMLElement) {
    pushState(params, url, url);

    _runListen();
    detail.paths.push({ path, params, hash: hashStringify(path, params) });
    ele.setAttribute("data-navi-path", url);
    detail.rootElement.append(ele);
  }

  const component = detail.routers[path];
  if (component.__navi_loadTimer) {
    clearTimeout(component.__navi_loadTimer);
  }

  let element = await Promise.resolve(component(params));

  // 如果是异步加载，当前还是一个模块
  if (element.__esModule) {
    // 读取模块的组件，并且执行获取元素
    element = await element[component.__navi_importName || "default"](params);
  }
  pushEnd(element);
}

function pop() {
  detail.isPopBlock = true;
  if (!detail || !detail.rootElement || !detail.rootElement.lastChild) {
    return;
  }

  const _naviBeforePop = (detail.rootElement.lastChild as any)._naviBeforePop;

  function doPop() {
    _runListen();
    detail.paths.pop();
    window.history.back();
    // const path = detail.paths[detail.paths.length-1];
    // window.history.replaceState(path.params, path.hash, path.hash);

    detail.rootElement.lastChild &&
      detail.rootElement.removeChild(detail.rootElement.lastChild);
  }

  if (_naviBeforePop) {
    _naviBeforePop.event();
    setTimeout(() => {
      doPop();
    }, _naviBeforePop.duration);
  } else {
    doPop();
  }
}

function canPop() {
  return detail.rootElement.childNodes.length >= 1;
}

function _runListen() {
  const listenFnKeys = Object.keys(detail.listenFunctions);
  listenFnKeys.forEach(k => {
    const fn = detail.listenFunctions[Number(k)];
    fn({
      path: detail.paths[detail.paths.length - 1].path,
      params: detail.paths[detail.paths.length - 1].params
    });
  });
}

function listen(fn: (options: IListen) => any) {
  let key = detail.listenFunctionKey++;
  detail.listenFunctions[key] = fn;
  return () => {
    delete detail.listenFunctions[key];
  };
}

/**
 *  Register page, can use push(path) change navigator
 *
 * @param {string} path
 * @param {(...args: any[]) => HTMLElement} component
 */
function use(
  path: string,
  component: (...args: any[]) => any,
  delayAutoLoad?: number,
  importName = "default"
) {
  // 处理预加载
  if (delayAutoLoad) {
    const loadTimer = setTimeout(() => {
      component().then((comp: any) => {
        (component as any).__navi_loadTimer = null;
        detail.routers[path] = comp[importName];
      });
    }, delayAutoLoad);
    // 用于记录clearTime，当主动加载时，取消预加载
    (component as any).__navi_loadTimer = loadTimer;
  }
  (component as any).__navi_importName = importName;

  detail.routers[path] = component;
}

// use window.location.hash load [path] and [params]
function hashParse(hash = window.location.hash): [string, any] {
  hash = hash.replace(detail.division, "");

  if (hash && hash.indexOf("?") >= -1) {
    const obj = hash.split("?");
    return [obj[0], queryString.parse(obj[1]) || undefined];
  }

  return [hash, undefined];
}

function hashStringify(path: string, params?: { [key: string]: any }) {
  let url = "";
  if (params) {
    url = `${detail.division}${path}?${queryString.stringify(params)}`;
  } else {
    url = `${detail.division}${path}`;
  }
  return url;
}

const navi: INavi = {
  root: detail.rootElement,
  canPop,
  push,
  pop,
  listen,
  detail,
  use,
  init,
  hashParse,
  hashStringify
};

// 监听浏览器路由是否变化
if (typeof window !== "undefined") {
  window.addEventListener("popstate", function(event) {
    if (detail.isPopBlock) {
      detail.isPopBlock = false;
      return;
    }

    pushState({ temp: "1" }, "", "");
    pop();
  });
}

export default navi;
