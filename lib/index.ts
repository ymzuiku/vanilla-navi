import queryString from "querystring-number";

export interface IPaths {
  path: string;
  params?: { [key: string]: any };
}

export interface IRegister {
  path: string;
  component: (...args: any[]) => HTMLElement;
}

export interface IListen {
  path: string;
  params?: { [key: string]: any };
}

export interface IDetail {
  division: string;
  rootElement: HTMLElement;
  paths: [IPaths];
  navis: { [key: string]: any };
  listenFunctions: { [key: number]: (options: IListen) => any };
  listenFunctionKey: number;
  routers: { [key: string]: any };
  initData: { path: string; params?: { [key: string]: any } };
}

const detail: IDetail = {
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
detail.rootElement.style.height = "100%";
detail.rootElement.id = "navi-root";

// 初始化页面，如果有路由
function init(path: string, params?: { [key: string]: any }) {
  if (!detail.initData) {
    detail.initData = { path, params };
  }

  const hash = window.location.hash;
  clearHistory();
  let realPath;
  let realParams;

  // 如果浏览器有目标路径，推进第二层路由
  if (hash) {
    const pp = getPathAndParams();
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

function push(path: string, params?: { [key: string]: any }) {
  if (detail.routers[path] === undefined) {
    push(detail.initData.path, detail.initData.params);
    return;
  }

  let ele: HTMLElement;
  let url = "";
  if (params) {
    ele = detail.routers[path](params);
    url = `${detail.division}${path}?${queryString.stringify(params)}`;
  } else {
    ele = detail.routers[path]();
    url = `${detail.division}${path}`;
  }

  window.history.pushState(null, "", url);

  _runListen();
  detail.paths.push({ path, params });
  ele.setAttribute("data-navi-path", url);
  detail.rootElement.append(ele);
}

function pop() {
  if (!detail.rootElement.lastChild) {
    console.warn("vanilla-navi: no have child elements");
    return;
  }
  const _naviBeforePop = (detail.rootElement.lastChild as any)._naviBeforePop;

  _runListen();
  detail.paths.pop();
  window.history.back();

  if (_naviBeforePop) {
    _naviBeforePop.event();
    setTimeout(() => {
      detail.rootElement.lastChild &&
        detail.rootElement.removeChild(detail.rootElement.lastChild);
    }, _naviBeforePop.duration);
  } else {
    detail.rootElement.removeChild(detail.rootElement.lastChild);
  }
}

function canPop() {
  return !!detail.rootElement.lastChild;
}

const clearHistory = () => {
  let state = { title: "", url: "" };
  window.history.pushState(state, state.title, state.url);
};

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
function use(path: string, component: (...args: any[]) => HTMLElement) {
  detail.routers[path] = component;
  console.log(detail.routers);
}

// use window.location.hash load [path] and [params]
function getPathAndParams(): [string, any] {
  let hash = window.location.hash;
  hash = hash.replace(detail.division, "");

  if (hash && hash.indexOf("?") >= -1) {
    const obj = hash.split("?");
    return [obj[0], queryString.parse(obj[1])];
  }

  return [hash, undefined];
}

const Navi = {
  root: detail.rootElement,
  canPop,
  push,
  pop,
  listen,
  detail,
  use,
  init,
  getPathAndParams,
  clearHistory
};

// 监听浏览器路由是否变化
if (typeof window !== "undefined") {
  window.addEventListener("popstate", event => {
    let isPop = false;

    for (let i = 0; i < detail.paths.length; i++) {
      const pp = detail.paths[i];
      if (pp.path === window.location.hash) {
        isPop = true;
        break;
      }
    }

    console.log("=-===", isPop, detail.initData);

    if (!isPop) {
      const [path, params] = getPathAndParams();
      if (!detail.routers[path]) {
        Navi.init(detail.initData.path, detail.initData.params);
      } else {
        Navi.init(path, params);
      }
    }

    console.log("=-===", isPop, detail.initData);
  });
}

export default Navi;
