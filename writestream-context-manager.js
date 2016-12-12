/* jshint undef: false, esversion: 6 */
 
module.exports = function() {
  'use strict';
  
  function using(stream, fn) {
    
    var promise = new Promise(function (resolve, reject) {
      fn(stream);
      resolve();
    });
    
    return promise.then(function(){}).catch(function () {}).then(function () {
      return stream.end();  
    });    
  }
  
  return {using: using};  
}();