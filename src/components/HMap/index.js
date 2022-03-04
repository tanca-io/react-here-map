import React from "react";
import PropTypes from "prop-types";
import build from "../../libs/mapBuilder";
import defaults from "../../libs/defaults";
import merge from "lodash.merge";

class HMap extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = { builder: {} };
  }

  componentDidMount() {
    const _props = this.props;
    const _options = merge(
      {
        container: this.container.current,
        build: true
      },
      _props.options,
      _props
    );
    delete _options.options;
    const builder = build(_props.platform, _options);
    this.setState({ builder });
  }
  createLoadingComponent() {
    return <div>Loading</div>;
  }
  displayChildren() {
    const { children } = this.props;
    const { map, platform, ui, options } = this.state.builder;
    return React.Children.map(children, child =>
      React.cloneElement(child, { map, platform, ui, __options: options })
    );
  }
  cleanMapObjects(){
    const { map} = this.state.builder;
    map.removeObjects(map.getObjects ());
  }
  removeMarkerByCoords(coords){
    const { map} = this.state.builder;
    const mapObjects=map.getObjects();
    for (var i = 0; i < mapObjects.length; i++) {
      if (mapObjects[i] instanceof H.map.Marker) {
        if(mapObjects[i].b.lat===coords.lat && mapObjects[i].b.lng===coords.lng ){
          map.removeObject(mapObjects[i]);
        }
      }
    }
  }
  getPositionByXandY(x, y){
    const { map} = this.state.builder;
    return map.screenToGeo(x, y);
  }
  setCenter(latLng) {
    const { map} = this.state.builder;
    map.setCenter(new H.geo.Point(latLng.lat, latLng.lng), true);
  }

  setZoom(value){
    const { map} = this.state.builder;
        map.setZoom(value, true);
}

  render() {
    const { style, loadingEl } = this.props;
    const { options } = this.state.builder;

    const loading = loadingEl || this.createLoadingComponent();
    return (
      <div
        id={defaults.containerId}
        className={defaults.defaultClassName}
        style={style}
        ref={this.container}
      >
        {typeof H === "undefined" && !options && loading}
        {typeof H === "object" && options && this.displayChildren()}
      </div>
    );
  }
}

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
