({
	callServer: function(component, method, callback, params, cacheable) {
    var action = component.get(method);
    if (params) action.setParams(params);
    if (cacheable) action.setStorable();
    action.setCallback(this, (response) => {
      var state = response.getState();
      if (state === "SUCCESS") {
        callback.call(this, response.getReturnValue());
      } else if (state === "INCOMPLETE") {
        // console.log('incomplete');
      } else if (state === "ERROR") {

      }
    })
    $A.enqueueAction(action);
  },
})