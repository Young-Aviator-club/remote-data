!function(r,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((r||self).remoteData={})}(this,function(r){function n(r){return Array.isArray(r)?r.some(function(r){return"LOADING"===r.type}):"LOADING"===r.type}function t(r){return Array.isArray(r)?r.some(function(r){return"RELOADING"===r.type}):"RELOADING"===r.type}function e(r){return Array.isArray(r)?r.every(function(r){return"SUCCESS"===r.type}):"SUCCESS"===r.type}function i(r){return Array.isArray(r)?r.some(function(r){return"FAILURE"===r.type}):"FAILURE"===r.type}r.failure=function(r){return{type:"FAILURE",error:r}},r.fold=function(r,u){var o=u.notAsked,f=u.loading,a=u.failure,s=u.success,y=u.reloading;if(Array.isArray(r)){if(a){var c=r.filter(function(r){return i(r)});if(c.length>0)return a(c.map(function(r){return r.error}))}if(f&&r.filter(function(r){return n(r)}).length>0)return f();if(y&&r.filter(function(r){return t(r)}).length>0)return y();var A=r.filter(function(r){return e(r)});return r.length===A.length?s(A.map(function(r){return r.data})):o()}return"LOADING"===r.type&&f?f():"RELOADING"===r.type&&y?y():"FAILURE"===r.type&&a?a(r.error):"SUCCESS"===r.type?s(r.data):o()},r.isFailure=i,r.isLoading=n,r.isNotAsked=function(r){return Array.isArray(r)?r.some(function(r){return"NOT_ASKED"===r.type}):"NOT_ASKED"===r.type},r.isReloading=t,r.isSuccess=e,r.loading=function(){return{type:"LOADING"}},r.notAsked=function(){return{type:"NOT_ASKED"}},r.reloading=function(){return{type:"RELOADING"}},r.success=function(r){return{type:"SUCCESS",data:r}},r.successOrElse=function(r,n){return Array.isArray(r)?e(r)?r.map(function(r){return r.data}):n(r):e(r)?r.data:n(r)}});
//# sourceMappingURL=index.umd.js.map
