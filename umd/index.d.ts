export interface IPaths {
    path: string;
    params?: {
        [key: string]: any;
    };
    hash: string;
}
export interface IListen {
    path: string;
    params?: {
        [key: string]: any;
    };
}
export interface IDetail {
    isPopBlock: boolean;
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
export interface INavi {
    root: HTMLElement;
    canPop: () => boolean;
    push: (path: string, params?: {
        [key: string]: any;
    }) => any;
    pop: () => any;
    listen: (fn: (options: IListen) => any) => any;
    detail: IDetail;
    use: (path: string, component: (...args: any[]) => any, delayAutoLoad?: number, importName?: string) => any;
    init: (path: string, params?: {
        [key: string]: any;
    }) => any;
    hashParse: (hash: string) => [string, any];
    hashStringify: (path: string, params?: {
        [key: string]: any;
    }) => string;
}
declare const navi: INavi;
export default navi;
