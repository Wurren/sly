
;(function(window, document, undefined) {

     /*
     |--------------------------------------------------------------------------
     | forEach Polyfill
     |--------------------------------------------------------------------------
     */

     // Production steps of ECMA-262, Edition 5, 15.4.4.18
     // Reference: http://es5.github.io/#x15.4.4.18
     if (!Array.prototype.forEach) {

          Array.prototype.forEach = function(callback, thisArg) {

               var T, k;

               if (this == null) {
                    throw new TypeError(' this is null or not defined');
               }

               // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
               var O = Object(this);

               // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
               // 3. Let len be ToUint32(lenValue).
               var len = O.length >>> 0;

               // 4. If IsCallable(callback) is false, throw a TypeError exception.
               // See: http://es5.github.com/#x9.11
               if (typeof callback !== "function") {
                    throw new TypeError(callback + ' is not a function');
               }

               // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
               if (arguments.length > 1) {
                    T = thisArg;
               }

               // 6. Let k be 0
               k = 0;

               // 7. Repeat, while k < len
               while (k < len) {

                    var kValue;

                    // a. Let Pk be ToString(k).
                    //   This is implicit for LHS operands of the in operator
                    // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                    //   This step can be combined with c
                    // c. If kPresent is true, then
                    if (k in O) {

                         // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                         kValue = O[k];

                         // ii. Call the Call internal method of callback with T as the this value and
                         // argument list containing kValue, k, and O.
                         callback.call(T, kValue, k, O);
                    }
                    // d. Increase k by 1.
                    k++;
               }
               // 8. return undefined
          };
          
     }


     /*
     |--------------------------------------------------------------------------
     | filter Polyfill
     |--------------------------------------------------------------------------
     */

     if (!Array.prototype.filter) {
          Array.prototype.filter = function(fun/*, thisArg*/) {
               'use strict';

               if (this === void 0 || this === null) {
                    throw new TypeError();
               }

               var t = Object(this);
               var len = t.length >>> 0;
               if (typeof fun !== 'function') {
                    throw new TypeError();
               }

               var res = [];
               var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
               for (var i = 0; i < len; i++) {
                    if (i in t) {
                         var val = t[i];

                         // NOTE: Technically this should Object.defineProperty at
                         //       the next index, as push can be affected by
                         //       properties on Object.prototype and Array.prototype.
                         //       But that method's new, and collisions should be
                         //       rare, so use the more-compatible alternative.
                         if (fun.call(thisArg, val, i, t)) {
                              res.push(val);
                         }
                    }
               }

               return res;
          };
     }

})(window, document);



/*
|--------------------------------------------------------------------------
| addEventListener Polyfill
|--------------------------------------------------------------------------
*/

//addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
;(function(win, doc){
     if(win.addEventListener)return;         //No need to polyfill

     function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}
     function addEvent(on, fn, self){
          return (self = this).attachEvent('on' + on, function(e){
               var e = e || win.event;
               e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
               e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
               fn.call(self, e);
          });
     }
     function addListen(obj, i){
          if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
          else obj.addEventListener = addEvent;
          return obj;
     }

     addListen([doc, win]);
     if('Element' in win)win.Element.prototype.addEventListener = addEvent;               //IE8
     else{                                                                                               //IE < 8
          doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});          //Make sure we also init at domReady
          docHijack('getElementsByTagName');
          docHijack('getElementById');
          docHijack('createElement');
          addListen(doc.all); 
     }
})(window, document);