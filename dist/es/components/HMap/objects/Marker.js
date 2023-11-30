import React from "react";
import PropTypes from "prop-types";
import merge from "lodash.merge";
import initMapObjectEvents from "../../../libs/initMapObjectEvents";
import { getBehavior } from "../../../libs/initInteraction";
function Marker(props) {
  var _merge = merge({
      setViewBounds: true,
      updateMarker: false,
      marker: null,
      getMarker: function getMarker() {},
      draggable: false
    }, props),
    icon = _merge.icon,
    map = _merge.map,
    coords = _merge.coords,
    type = _merge.type,
    options = _merge.options,
    setViewBounds = _merge.setViewBounds,
    updateMarker = _merge.updateMarker,
    marker = _merge.marker,
    getMarker = _merge.getMarker,
    objectEvents = _merge.objectEvents,
    platform = _merge.platform,
    ui = _merge.ui,
    draggable = _merge.draggable,
    __options = _merge.__options;
  var _options = options;
  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }
  if (!coords.lat || !coords.lng) {
    throw new Error("coords should be an object having 'lat' and 'lng' as props");
  }
  if (!icon) {
    // throw new Error("icon is not set, Marker will not be rendered");
  }
  if (type && type === "DOM") {
    // Displays a DOM Icon
    _options.icon = new H.map.DomIcon(icon);
  } else if (type) {
    // Displays a static icon
    _options.icon = new H.map.Icon(icon);
  }

  // Create an icon, an object holding the latitude and longitude, and a marker:
  var _marker = updateMarker && marker ? marker : new H.map.Marker(coords, _options);
  if (draggable) {
    _marker.draggable = draggable;
    _options.volatility = draggable;
    var supportsPassive = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function get() {
          supportsPassive = true;
        }
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {}
    map.addEventListener('dragstart', function (ev) {
      var target = ev.target,
        pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        var targetPosition = map.geoToScreen(target.getGeometry());
        target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
        var interaction = getBehavior();
        //if(interaction.disable){
        interaction.disable();
        //}
      }
    }, supportsPassive ? {
      passive: true
    } : false);

    // re-enable the default draggability of the underlying map
    // when dragging has completed
    map.addEventListener('dragend', function (ev) {
      var target = ev.target;
      if (target instanceof H.map.Marker) {
        var interaction = getBehavior();
        //if(interaction.enable){
        interaction.enable();
        //}
      }
    }, supportsPassive ? {
      passive: true
    } : false);

    // Listen to the drag event and move the position of the marker
    // as necessary
    map.addEventListener('drag', function (ev) {
      var target = ev.target,
        pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
      }
    }, supportsPassive ? {
      passive: true
    } : false);
  }

  // Checks if object of same coordinates have been added formerly
  var addedObjects = map.getObjects();
  var objectExists = addedObjects.some(function (object) {
    if (typeof object.getPosition === "function") {
      var _object$getPosition = object.getPosition(),
        lat = _object$getPosition.lat,
        lng = _object$getPosition.lng;
      return lat === coords.lat && coords.lng === lng;
    }
  });

  // This object exists we don't want to add it again. Update the position
  if (!objectExists && !updateMarker) {
    // Add event listener to the object if intention of using the object is defined
    initMapObjectEvents(_marker, objectEvents, __options);
    map.addObject(_marker);
  } else if (updateMarker) {
    // If we are updating, no need to create
    _marker.setPosition(coords);
  }

  // Send the marker to the parent
  !marker ? getMarker(_marker) : null;

  // Centers the marker
  setViewBounds ? map.setCenter(coords) : null;

  // There is no need to render something useful here, HereMap does that magically
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "none"
    }
  });
}
Marker.propTypes = {
  coords: PropTypes.object.isRequired,
  icon: PropTypes.any,
  options: PropTypes.object,
  type: PropTypes.string,
  setViewBounds: PropTypes.bool,
  map: PropTypes.object,
  objectEvents: PropTypes.object
};
export default Marker;