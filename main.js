import "./style.css";
import "ol/ol.css";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import {TileWMS } from "ol/source";

var layers = {};

layers["satImg4"] = new TileLayer({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    crossOrigin: "",
    params: {
      LAYERS: "Theplatform:img4",
      FORMAT: "image/jpeg",
      TILED: true,
    },
  }),
});

layers["satImg2"] = new TileLayer({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    crossOrigin: "",
    params: {
      LAYERS: "Theplatform:img2",
      FORMAT: "image/jpeg",
      TILED: true,
    },
  }),
});

//Vector Layer
//==================

layers["wmsRoad"] = new TileLayer({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Theplatform:road" },
    serverType: "geoserver",
    crossOrigin: "anonymous",
  }),
  visible: false
});

layers["wmsWater"] = new TileLayer({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Theplatform:water" },
    serverType: "geoserver",
    crossOrigin: "anonymous",
  }),
  visible: false
});
layers["wmsHill"] = new TileLayer({
  source: new TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Theplatform:hill" },
    serverType: "geoserver",
    crossOrigin: "anonymous",
  }),
  visible: false
});


var view = new View({
  center: [3532850.52475, 2634703.21512],
  zoom: 9,
});

var map = new Map({
  layers: [
    layers["satImg4"],
    layers["wmsRoad"],
    layers["wmsWater"],
    layers["wmsHill"],
  ],
  target: "map",
  view: view,
});

var baseLayerSelect = document.getElementById("base-layer");
var roadOverlay = document.getElementById("roads");
var waterOverlay = document.getElementById("water");
var hillOverlay = document.getElementById("hills");
var content = document.getElementById('info');

roadOverlay.addEventListener("click", function (evt) {
    if (roadOverlay.checked) {
      layers["wmsRoad"].setVisible(true);
    }else{
      layers["wmsRoad"].setVisible(false);
  }
});

hillOverlay.addEventListener("click", function (evt) {
  if (hillOverlay.checked) {
    layers["wmsHill"].setVisible(true);
  }else{
    layers["wmsHill"].setVisible(false);
}
});

waterOverlay.addEventListener("click", function (evt) {
  if (waterOverlay.checked) {
    layers["wmsWater"].setVisible(true);
  }else{
    layers["wmsWater"].setVisible(false);
}
});

/**
 * Handle change event.
 */
baseLayerSelect.onchange = function () {
  var layer = layers[baseLayerSelect.value];
  if (layer) {
    layer.setOpacity(1);
    map.getLayers().setAt(0, layer);
  }
};

map.on('singleclick', function (evt) {
  var viewResolution = /** @type {number} */ (view.getResolution());
  var url = layers["wmsWater"].getSource().getGetFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    'EPSG:3857',
    {'INFO_FORMAT': 'text/html'}
  );
  if (url) {
    fetch(url)
      .then(function (response) { return response.text(); })
      .then(function (html) {
        console.log(html)
        content.innerHTML = html;
      });
  }
  var url = layers["wmsRoad"].getSource().getGetFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    'EPSG:3857',
    {'INFO_FORMAT': 'text/html'}
  );
  if (url) {
    fetch(url)
      .then(function (response) { return response.text(); })
      .then(function (html) {
        content.innerHTML = html;
      });
  }
  var url = layers["wmsHill"].getSource().getGetFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    'EPSG:3857',
    {'INFO_FORMAT': 'text/html'}
  );
  if (url) {
    fetch(url)
      .then(function (response) { return response.text(); })
      .then(function (html) {
        content.innerHTML = html;
      });
  }
});

map.on("pointermove", function (evt) {
  if (evt.dragging) {
    return;
  }
  var pixel = map.getEventPixel(evt.originalEvent);
  var hit = map.forEachLayerAtPixel(pixel, function () {
    return true;
  });
  map.getTargetElement().style.cursor = hit ? "pointer" : "";
});
