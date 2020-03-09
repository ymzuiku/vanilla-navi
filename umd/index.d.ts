export interface IPaths {
    path: string;
    params?: {
        [key: string]: any;
    };
}
export interface IRegister {
    path: string;
    component: (...args: any[]) => HTMLElement;
}
export interface IListen {
    path: string;
    params?: {
        [key: string]: any;
    };
}
export interface IDetail {
    division: string;
    rootElement: HTMLElement;
    paths: [IPaths];
    navis: {
        [key: string]: any;
    };
    listenFunctions: {
        [key: number]: (options: IListen) => any;
    };
    listenFunctionKey: number;
    routers: {
        [key: string]: any;
    };
    initData: {
        path: string;
        params?: {
            [key: string]: any;
        };
    };
}
declare function init(path: string, params?: {
    [key: string]: any;
}): void;
declare function push(path: string, params?: {
    [key: string]: any;
}): void;
declare function pop(): void;
declare function canPop(): boolean;
declare function listen(fn: (options: IListen) => any): () => void;
/**
 *  Register page, can use push(path) change navigator
 *
 * @param {string} path
 * @param {(...args: any[]) => HTMLElement} component
 */
declare function use(path: string, component: (...args: any[]) => HTMLElement): void;
declare function getPathAndParams(): [string, any];
declare const Navi: {
    root: HTMLElement;
    canPop: typeof canPop;
    push: typeof push;
    pop: typeof pop;
    listen: typeof listen;
    detail: IDetail;
    use: typeof use;
    init: typeof init;
    getPathAndParams: typeof getPathAndParams;
    clearHistory: () => void;
};
export default Navi;
