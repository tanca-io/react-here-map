function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
import React from "react";
import PropTypes from "prop-types";
import build from "../../libs/mapBuilder";
import defaults from "../../libs/defaults";
import merge from "lodash.merge";
var HMap = /*#__PURE__*/function (_React$Component) {
  _inherits(HMap, _React$Component);
  var _super = _createSuper(HMap);
  function HMap(props) {
    var _this;
    _classCallCheck(this, HMap);
    _this = _super.call(this, props);
    _this.container = /*#__PURE__*/React.createRef();
    _this.state = {
      builder: {}
    };
    return _this;
  }
  _createClass(HMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props;
      var _options = merge({
        container: this.container.current,
        build: true
      }, _props.options, _props);
      delete _options.options;
      var builder = build(_props.platform, _options);
      this.setState({
        builder: builder
      });
    }
  }, {
    key: "createLoadingComponent",
    value: function createLoadingComponent() {
      return /*#__PURE__*/React.createElement("div", null, "Loading");
    }
  }, {
    key: "displayChildren",
    value: function displayChildren() {
      var children = this.props.children;
      var _this$state$builder = this.state.builder,
        map = _this$state$builder.map,
        platform = _this$state$builder.platform,
        ui = _this$state$builder.ui,
        options = _this$state$builder.options;
      return React.Children.map(children, function (child) {
        return /*#__PURE__*/React.cloneElement(child, {
          map: map,
          platform: platform,
          ui: ui,
          __options: options
        });
      });
    }
  }, {
    key: "cleanMapObjects",
    value: function cleanMapObjects() {
      var map = this.state.builder.map;
      map.removeObjects(map.getObjects());
    }
  }, {
    key: "removeMarkerByCoords",
    value: function removeMarkerByCoords(coords) {
      var map = this.state.builder.map;
      var mapObjects = map.getObjects();
      for (var i = 0; i < mapObjects.length; i++) {
        if (mapObjects[i] instanceof H.map.Marker) {
          if (mapObjects[i].b.lat === coords.lat && mapObjects[i].b.lng === coords.lng) {
            map.removeObject(mapObjects[i]);
          }
        }
      }
    }
  }, {
    key: "getPositionByXandY",
    value: function getPositionByXandY(x, y) {
      var map = this.state.builder.map;
      return map.screenToGeo(x, y);
    }
  }, {
    key: "setCenter",
    value: function setCenter(latLng) {
      var map = this.state.builder.map;
      map.setCenter(new H.geo.Point(latLng.lat, latLng.lng), true);
    }
  }, {
    key: "setZoom",
    value: function setZoom(value) {
      var map = this.state.builder.map;
      map.setZoom(value, true);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        style = _this$props.style,
        loadingEl = _this$props.loadingEl;
      var options = this.state.builder.options;
      var loading = loadingEl || this.createLoadingComponent();
      return /*#__PURE__*/React.createElement("div", {
        id: defaults.containerId,
        className: defaults.defaultClassName,
        style: style,
        ref: this.container
      }, typeof H === "undefined" && !options && loading, (typeof H === "undefined" ? "undefined" : _typeof(H)) === "object" && options && this.displayChildren());
    }
  }]);
  return HMap;
}(React.Component);
HMap.propTypes = {
  version: PropTypes.string,
  mapType: PropTypes.string,
  useEvents: PropTypes.bool,
  interactive: PropTypes.bool,
  includeUI: PropTypes.bool,
  mapEvents: PropTypes.object,
  platform: PropTypes.object,
  options: PropTypes.object,
  mapOptions: PropTypes.object
};
export default HMap;