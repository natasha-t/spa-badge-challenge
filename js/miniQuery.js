var miniQuery = (function(){

   var SweetSelector = (function(){
    return {
       select: function(selector) {
         var element = selector.slice(0,1);
         if (element === "#") {
           return document.getElementById(selector.slice(1,selector.length));
         } else if (element === ".") {
           return document.getElementsByClassName(selector.slice(1,selector.length))
         } else {
           return document.getElementsByTagName(selector)
         }
        }
      };
   })();

   var DOM = (function() {
     return {
       hide: function(selector) {
         return SweetSelector.select(selector).style.display="none";
       },
       show: function(selector) {
         return SweetSelector.select(selector).style.display=null;
       },
       addClass: function(selector, newClass) {
         return SweetSelector.select(selector).className = selector.slice(1,selector.length) + " " + newClass;
       },
       removeClass: function(selector, removeClass) {
         return SweetSelector.select(selector).className = SweetSelector.select(selector).className.replace(removeClass, '').trim();
       }
     };
   })();

   var EventDispatcher = (function() {
     return {
       on: function(selector, event, eventFunction){
         var elements = SweetSelector.select(selector);
         for(var i = 0; i < elements.length; i++){
            elements[i].addEventListener(event, eventFunction);
         }

       },
       trigger: function(selector, event){
        var newEvent = new Event(event);
        var elements = SweetSelector.select(selector);
         for(var i = 0; i < elements.length; i++){
            elements[i].dispatchEvent(newEvent);
         }
       }
     };
   })();

   var AjaxWrapper = (function(){
     return {
       request: function(ajaxRequest) {
         var promise = new Promise(function(resolve, error){
           var newReq = new XMLHttpRequest();
           newReq.open(ajaxRequest.type, ajaxRequest.url);
           newReq.send();

           newReq.onload = function() {
             if(this.status >= 200 && this.status < 300) {
               resolve(this.response);
             } else {
               error(this.statusText);
             }
           };

         });
         return promise;
       }
     };
   })();

   return {
     SweetSelector: SweetSelector,
     DOM: DOM,
     EventDispatcher: EventDispatcher,
     AjaxWrapper: AjaxWrapper
   }

 })();
