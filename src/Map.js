import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createLayer } from './3dLayer';

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
      zoom: 16,
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
          'https://www.jma.go.jp/bosai/jmatile/data/nowc/20210611051000/none/20210611051000/surf/hrpns/{z}/{x}/{y}.png',
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
