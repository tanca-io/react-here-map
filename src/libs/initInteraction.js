// Add interactivity if set from the options
// interactive and useEvents must be true to use map events
const changeCursorToGrab = () => {};
let behavior;
export default (map, interactive, useEvents, mapEvents) => {
  behavior = //false;
  interactive
    ? new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    : null;
  if (useEvents && interactive) {
    for (const type in mapEvents) {
      if (mapEvents.hasOwnProperty(type)) {
        const callback = mapEvents[type];
        if (callback && typeof callback === "function") {
          map.addEventListener(type, function(evt) {
            callback.apply(null, arguments);
          });
        }
      }
    }
  }
  return behavior;
};

export function getBehavior(){
  return behavior;
}
