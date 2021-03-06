import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createLayer } from '~/components/layers/3dLayer';
import { ScatterplotLayer, ColumnLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
// import { point } from './rain_point';
// import { CPUGridLayer } from '@deck.gl/aggregation-layers';
import point_json from './point.json';
import point_time_json from './point_time.json';

const styles = () => ({
  root: {
    width: '100%',
    minHeight: '90vh',
    padding: 0,
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
  },
});

class App extends Component {
  constructor(properties) {
    super(properties);
    this.state = {
      lng: -70.9,
      lat: 42.35,
      zoom: 9,
    };
    this.mapContainer = React.createRef();
  }
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.container,
      style: 'mapbox://styles/hiroki-beguru/ckotmckvz2mqx18qbu55ovma9',
      center: [140.1831, 35.55],
      zoom: 10,
      antialias: true,
    });

    this.map.on('load', () => {
      let lat = 140.1831;
      const lon = 35.551111;

      for (let index = 0; index < 3; index++) {
        this.map.addLayer(
          createLayer(lat, lon, `id_${index}`),
          'waterway-label'
        );
        lat = lat + 0.005;
      }
      this.map.addLayer({
        id: 'terrain-data',
        type: 'line',
        source: {
          type: 'vector',
          url: 'mapbox://hiroki-beguru.2mnnjsks',
        },
        'source-layer': 'A31-12_12_GML-b3b504',
        // layout: {
        //   'line-join': 'round',
        //   'line-cap': 'round',
        // },
        // paint: {
        //   'line-color': '#ff69b4',
        //   'line-width': 1,
        // },
      });
      // this.map.addLayer({
      //   id: 'traffic-data',
      //   type: 'line',
      //   source: {
      //     type: 'vector',
      //     url: 'mapbox://mapbox.mapbox-traffic-v1',
      //   },
      //   'source-layer': 'traffic',
      //   // layout: {
      //   //   'line-join': 'round',
      //   //   'line-cap': 'round',
      //   // },
      //   // paint: {
      //   //   'line-color': '#ff69b4',
      //   //   'line-width': 1,
      //   // },
      // });
      // this.map.addSource('contours', {
      //   type: 'vector',
      //   url: 'mapbox://mapbox.mapbox-terrain-v2',
      // });

      this.map.addSource('m_color', {
        type: 'raster',
        tiles: [
          'https://www.jma.go.jp/bosai/jmatile/data/nowc/20210614015000/none/20210614015000/surf/hrpns/{z}/{x}/{y}.png',
        ],
        tileSize: 256,
        maxzoom: 9,
      });
      this.map.addLayer({
        id: 'm_color',
        type: 'raster',
        source: 'm_color',
        // minzoom: 8,
        // 'raster-opacity': 0.25,
        // layout: {
        //   'icon-image': 'image',
        //   'icon-size': 0.8,
        //   'icon-allow-overlap': true,
        // },
        paint: { 'raster-opacity': 0.55 },
        layout: {
          visibility: 'visible',
        },
      });

      // this.map.addLayer({
      //   id: 'contours',
      //   type: 'raster',
      //   tiles: [
      //     ' https://dufgzh2t.user.webaccel.jp/radar/20210608164500/{z}/{x}/{y}.png',
      //   ],
      //   // 'source-layer': 'traffic',
      //   // layout: {
      //   //   'line-join': 'round',
      //   //   'line-cap': 'round',
      //   // },
      //   // paint: {
      //   //   'line-color': '#ff69b4',
      //   //   'line-width': 1,
      //   // },
      // });
      // this.map.addLayer(
      //   createLayer(140.1831, 35.551111, 'id_1'),
      //   'waterway-label'
      // );
      // this.map.addLayer(
      //   createLayer(140.1835, 35.551111, 'id_2'),
      //   'waterway-label'
      // );
      // this.map.addLayer(
      //   createLayer(140.184, 35.551111, 'id_3'),
      //   'waterway-label'
      // );
      const myDeckLayer = new MapboxLayer({
        id: 'my-scatterplot',
        type: ScatterplotLayer,
        data: [{ position: [140.1831, 35.55], size: 1000 }],
        getPosition: (d) => d.position,
        getRadius: (d) => d.size,
        getColor: [255, 0, 0],
      });
      console.log('aaaa');
      console.log(Object.values(point_json.data));
      console.log(Object.values(point_time_json.data));
      for (const key in point_time_json.data) {
        if (point_json.data[key]) {
          point_json.data[key] = {
            ...point_time_json.data[key],
            ...point_json.data[key],
          };
          console.log(point_json.data[key]);
        }
      }
      const cpuGridLayer = new MapboxLayer({
        id: 'column-layer',
        type: ColumnLayer,
        // data: [
        //   {
        //     value: 1,
        //     centroid: [140.1831, 35.55],
        //   },
        // ],
        data: Object.values(point_json.data),
        // angle: 0,
        // coverage: 1,
        diskResolution: 12,
        elevationScale: 100,
        extruded: true,
        // filled: true,
        getElevation: (d) => d.PRCRIN_10MIN * 10,
        getFillColor: (d) => [48, 128, d.PRCRIN_10MIN * 255, 255],
        getLineColor: [0, 0, 0],
        getLineWidth: 40,
        getPosition: (d) => [d.LOND, d.LATD],
        // lineWidthMaxPixels: Number.MAX_SAFE_INTEGER,
        // lineWidthMinPixels: 0,
        // lineWidthScale: 1,
        // lineWidthUnits: 'meters',
        // material: true,
        // offset: [0, 0],
        radius: 250,
        // stroked: false,
        // vertices: null,
        // wireframe: false,

        /* props inherited from Layer class */

        // autoHighlight: false,
        // coordinateOrigin: [0, 0, 0],
        // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
        // highlightColor: [0, 0, 128, 128],
        // modelMatrix: null,
        // opacity: 1,
        pickable: true,
        // visible: true,
        // wrapLongitude: false,
      });

      window.setTimeout(() => {
        this.map.addLayer(myDeckLayer);
        // console.log(myDeckLayer);
        this.map.addLayer(cpuGridLayer);
      }, 100);
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }
  componentDidUpdate() {}

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div
          className={classes.map}
          ref={(error) => (this.container = error)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
