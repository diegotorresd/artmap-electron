'use strict';

class ArtMap {
  constructor(L, mapConf) {
    self.IMAGE_WIDTH = mapConf["width"];
    self.IMAGE_HEIGHT = mapConf["height"];
    self.MAX_ZOOM_AVAILABLE = mapConf["max_zoom"];
    self.artmap = L.map('map',{
      crs: L.CRS.Simple,
      maxZoom : MAX_ZOOM_AVAILABLE
    });
  }

  setFullscreen(container_width, container_height) {
    let max_zoom =  self.artmap.getMaxZoom();
    let southWest = self.artmap.unproject([0,IMAGE_HEIGHT], max_zoom);
    let northEast = self.artmap.unproject([IMAGE_WIDTH,0], max_zoom);
    let bound_zoom = self.artmap.getBoundsZoom([southWest, northEast]);
    self.artmap.setMaxBounds([southWest, northEast]);
    self.artmap.fitBounds([southWest, northEast]);
    self.artmap.getContainer().style.height = container_height + "px"
    let zoom_level = bound_zoom;
    for (; self.artmap.project(northEast, zoom_level).x < container_width; ++zoom_level) {
      if (zoom_level == max_zoom) break;
    }
    self.artmap.setZoomAround([0,0], zoom_level);
    self.artmap.options.minZoom = bound_zoom;
    self.artmap.invalidateSize();
  }

  setBaseLayer(L, mapConf) {
    let source = mapConf["layers"]["base"];
    L.tileLayer(source, {
      errorTileUrl: mapConf["blank_tile"],
      continuousWorld: true,
      attribution: 'Google Art Project'
    }).addTo(self.artmap);
  }
}

module.exports = ArtMap;
