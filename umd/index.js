!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("querystring-number")):"function"==typeof define&&define.amd?define(["querystring-number"],e):(t=t||self).vanillaNavi=e(t.queryString)}(this,function(n){"use strict";function t(n,i){var o,r,a,t,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return t={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,r&&(a=2&e[0]?r.return:e[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,e[1])).done)return a;switch(r=0,a&&(e=[2&e[0],a.value]),e[0]){case 0:case 1:a=e;break;case 4:return s.label++,{value:e[1],done:!1};case 5:s.label++,r=e[1],e=[0];continue;case 7:e=s.ops.pop(),s.trys.pop();continue;default:if(!(a=0<(a=s.trys).length&&a[a.length-1])&&(6===e[0]||2===e[0])){s=0;continue}if(3===e[0]&&(!a||e[1]>a[0]&&e[1]<a[3])){s.label=e[1];break}if(6===e[0]&&s.label<a[1]){s.label=a[1],a=e;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(e);break}a[2]&&s.ops.pop(),s.trys.pop();continue}e=i.call(n,s)}catch(t){e=[6,t],r=0}finally{o=a=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,t])}}}n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n;var i=/MicroMessenger/.test(navigator.userAgent),a={isPopBlock:!1,initData:null,routers:{},division:"#",paths:[],rootElement:document.createElement("div"),navis:{},listenFunctions:{},listenFunctionKey:0};function s(t,e,n){i?window.history.replaceState("wechat","",c(a.initData.path,a.initData.params)):window.history.pushState(t,e,n)}function u(o,r){return function(r,a,s,u){return new(s=s||Promise)(function(t,e){function n(t){try{o(u.next(t))}catch(t){e(t)}}function i(t){try{o(u.throw(t))}catch(t){e(t)}}function o(e){e.done?t(e.value):new s(function(t){t(e.value)}).then(n,i)}o((u=u.apply(r,a||[])).next())})}(this,void 0,void 0,function(){var e,n,i;return t(this,function(t){switch(t.label){case 0:return void 0===a.routers[o]?(u(a.initData.path,a.initData.params),[2]):0<a.paths.length&&a.paths[a.paths.length-1].path===o?[2]:(e=c(o,r),(n=a.routers[o]).__navi_loadTimer&&clearTimeout(n.__navi_loadTimer),[4,Promise.resolve(n(r))]);case 1:return(i=t.sent()).__esModule?[4,i[n.__navi_importName||"default"](r)]:[3,3];case 2:i=t.sent(),t.label=3;case 3:return function(t){s(r,e,e),l(),a.paths.push({path:o,params:r,hash:c(o,r)}),t.setAttribute("data-navi-path",e),a.rootElement.append(t)}(i),[2]}})})}function e(){if(a.isPopBlock=!0,a&&a.rootElement&&a.rootElement.lastChild){var t=a.rootElement.lastChild._naviBeforePop;t?(t.event(),setTimeout(function(){e()},t.duration)):e()}function e(){l(),a.paths.pop(),window.history.back(),a.rootElement.lastChild&&a.rootElement.removeChild(a.rootElement.lastChild)}}function l(){Object.keys(a.listenFunctions).forEach(function(t){(0,a.listenFunctions[Number(t)])({path:a.paths[a.paths.length-1].path,params:a.paths[a.paths.length-1].params})})}function r(t){if(void 0===t&&(t=window.location.hash),(t=t.replace(a.division,""))&&-1<=t.indexOf("?")){var e=t.split("?");return[e[0],n.parse(e[1])||void 0]}return[t,void 0]}function c(t,e){return e?""+a.division+t+"?"+n.stringify(e):""+a.division+t}a.rootElement.style.width="100%",a.rootElement.style.height="100%",a.rootElement.id="navi-root";var o={root:a.rootElement,canPop:function(){return 1<=a.rootElement.childNodes.length},push:u,pop:e,listen:function(t){var e=a.listenFunctionKey++;return a.listenFunctions[e]=t,function(){delete a.listenFunctions[e]}},detail:a,use:function(e,n,t,i){if(void 0===i&&(i="default"),t){var o=setTimeout(function(){n().then(function(t){n.__navi_loadTimer=null,a.routers[e]=t[i]})},t);n.__navi_loadTimer=o}n.__navi_importName=i,a.routers[e]=n},init:function(t,e){var n,i;if(a.initData||(a.initData={path:t,params:e}),window.location.hash){var o=r();n=o[0],i=o[1]}u(t,e),n&&JSON.stringify({path:t,params:e})!==JSON.stringify({path:n,params:i})&&u(n,i)},hashParse:r,hashStringify:c};return"undefined"!=typeof window&&window.addEventListener("popstate",function(t){a.isPopBlock?a.isPopBlock=!1:(s({temp:"1"},"",""),e())}),o});
//# sourceMappingURL=index.js.map
