// Add interactivity if set from the options
// interactive and useEvents must be true to use map events
var changeCursorToGrab = function changeCursorToGrab() {};

var behavior;
export default (function (map, interactive, useEvents, mapEvents) {
  behavior = //false;
  interactive ? new H.mapevents.Behavior(new H.mapevents.MapEvents(map)) : null;

  if (useEvents && interactive) {
    for (var type in mapEvents) {
      if (mapEvents.hasOwnProperty(type)) {
        (function () {
          var callback = mapEvents[type];

          if (callback && typeof callback === "function") {
            map.addEventListener(type, function (evt) {
              callback.apply(null, arguments);
            });
          }
        })();
      }
    }
  }

  return behavior;
});
export function getBehavior() {
  return behavior;
}