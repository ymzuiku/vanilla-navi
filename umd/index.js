!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("querystring-number")):"function"==typeof define&&define.amd?define(["querystring-number"],n):(t=t||self).vanillaNavi=n(t.queryString)}(this,function(e){"use strict";function f(e,i){var o,r,a,t,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return t={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function n(n){return function(t){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,r&&(a=2&n[0]?r.return:n[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,n[1])).done)return a;switch(r=0,a&&(n=[2&n[0],a.value]),n[0]){case 0:case 1:a=n;break;case 4:return s.label++,{value:n[1],done:!1};case 5:s.label++,r=n[1],n=[0];continue;case 7:n=s.ops.pop(),s.trys.pop();continue;default:if(!(a=0<(a=s.trys).length&&a[a.length-1])&&(6===n[0]||2===n[0])){s=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){s.label=n[1];break}if(6===n[0]&&s.label<a[1]){s.label=a[1],a=n;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(n);break}a[2]&&s.ops.pop(),s.trys.pop();continue}n=i.call(e,s)}catch(t){n=[6,t],r=0}finally{o=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,t])}}}e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e;var i=/MicroMessenger/.test(navigator.userAgent);return function(){var a={isPopBlock:!1,initData:null,routers:{},division:"#",paths:[],rootElement:document.createElement("div"),navis:{},listenFunctions:{},listenFunctionKey:0};function s(t,n,e){i?window.history.replaceState("wechat","",c(a.initData.path,a.initData.params)):window.history.pushState(t,n,e)}function u(o,r){return function(r,a,s,u){return new(s=s||Promise)(function(t,n){function e(t){try{o(u.next(t))}catch(t){n(t)}}function i(t){try{o(u.throw(t))}catch(t){n(t)}}function o(n){n.done?t(n.value):new s(function(t){t(n.value)}).then(e,i)}o((u=u.apply(r,a||[])).next())})}(this,void 0,void 0,function(){var n,e,i;return f(this,function(t){switch(t.label){case 0:return void 0===a.routers[o]?(u(a.initData.path,a.initData.params),[2]):(n=c(o,r),(e=a.routers[o]).__navi_loadTimer&&clearTimeout(e.__navi_loadTimer),[4,Promise.resolve(e(r))]);case 1:return(i=t.sent()).__esModule?[4,i[e.__navi_importName||"default"](r)]:[3,3];case 2:i=t.sent(),t.label=3;case 3:return function(t){s(r,n,n),l(),a.paths.push({path:o,params:r,hash:c(o,r)}),t.setAttribute("data-navi-path",n),a.rootElement.append(t)}(i),[2]}})})}function n(){if(a.isPopBlock=!0,a&&a.rootElement&&a.rootElement.lastChild){var t=a.rootElement.lastChild._naviBeforePop;t?(t.event(),setTimeout(function(){n()},t.duration)):n()}function n(){l(),a.paths.pop(),window.history.back(),a.rootElement.lastChild&&a.rootElement.removeChild(a.rootElement.lastChild)}}function l(){Object.keys(a.listenFunctions).forEach(function(t){(0,a.listenFunctions[Number(t)])({path:a.paths[a.paths.length-1].path,params:a.paths[a.paths.length-1].params})})}function r(t){if(void 0===t&&(t=window.location.hash),(t=t.replace(a.division,""))&&-1<=t.indexOf("?")){var n=t.split("?");return[n[0],e.parse(n[1])||void 0]}return[t,void 0]}function c(t,n){return n?""+a.division+t+"?"+e.stringify(n):""+a.division+t}a.rootElement.style.width="100%",a.rootElement.style.height="100%",a.rootElement.id="navi-root";var t={root:a.rootElement,canPop:function(){return 1<=a.rootElement.childNodes.length},push:u,pop:n,listen:function(t){var n=a.listenFunctionKey++;return a.listenFunctions[n]=t,function(){delete a.listenFunctions[n]}},detail:a,use:function(n,e,t,i){if(void 0===i&&(i="default"),t){var o=setTimeout(function(){e().then(function(t){e.__navi_loadTimer=null,a.routers[n]=t[i]})},t);e.__navi_loadTimer=o}e.__navi_importName=i,a.routers[n]=e},init:function(t,n){var e,i;if(a.initData||(a.initData={path:t,params:n}),window.location.hash){var o=r();e=o[0],i=o[1]}u(t,n),e&&JSON.stringify({path:t,params:n})!==JSON.stringify({path:e,params:i})&&u(e,i)},hashParse:r,hashStringify:c};return"undefined"!=typeof window&&window.addEventListener("popstate",function(t){a.isPopBlock?a.isPopBlock=!1:(s({temp:"1"},"",""),n())}),t}});
//# sourceMappingURL=index.js.map
