import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './Map';

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
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Map />
      </div>
    );
  }
}

export default withStyles(styles)(App);
