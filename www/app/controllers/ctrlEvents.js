define(function() {

  return {
    listen: function(obj,event,callback,boolean) {
      obj.addEventListener(event, callback, boolean);
    }
  };

});