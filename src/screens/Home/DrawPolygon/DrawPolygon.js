import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as geolib from 'geolib';
import MapView, {MAP_TYPES, Polygon, PROVIDER_GOOGLE} from 'react-native-maps';
import {colors, size} from '../../../utilities';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class DrawPolygon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      polygons: [],
      editing: null,
      creatingHole: false,
    };
  }

  finish() {
    const {polygons, editing} = this.state;
    this.setState(
      {
        polygons: [...polygons, editing],
        editing: null,
        creatingHole: false,
      },
      async () => {
        const data = this.calcPolygonArea(editing?.coordinates);
        // const data1 = this.calcPolygonPerimeter(editing?.coordinates);

        this.props.navigation.navigate('AddPolygon', {
          area: data,
          diemeter: 'Empty',
          coords: editing.coordinates,
        });
      },
    );
  }

  // Get area of a polygon
  calcPolygonArea(coords) {
    let coordArr = [];
    coords.forEach(element => {
      coordArr.push(Object.values(element));
    });
    const area = geolib.getAreaOfPolygon(coordArr);
    return Math.abs(area).toFixed(2);
  }

  // Get perimeter of a polygon
  calcPolygonPerimeter(coords) {
    let coordArr = [];
    coords.forEach(element => {
      coordArr.push(Object.values(element));
    });
    var x = 0;
    for (var i = 0; i < coordArr.length; i++) {
      x += coordArr[i];
    }
    return x;
  }

  createHole() {
    const {editing, creatingHole} = this.state;
    if (!creatingHole) {
      this.setState({
        creatingHole: true,
        editing: {
          ...editing,
          holes: [...editing.holes, []],
        },
      });
    } else {
      const holes = [...editing.holes];
      if (holes[holes.length - 1].length === 0) {
        holes.pop();
        this.setState({
          editing: {
            ...editing,
            holes,
          },
        });
      }
      this.setState({creatingHole: false});
    }
  }

  onPress(e) {
    const {editing, creatingHole} = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: [],
        },
      });
    } else if (!creatingHole) {
      this.setState({
        editing: {
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate],
        },
      });
    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate,
      ];
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [...editing.coordinates],
          holes,
        },
      });
    }
  }

  render() {
    const mapOptions = {
      scrollEnabled: true,
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = e => this.onPress(e);
    }

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          mapType={MAP_TYPES.STANDARD}
          initialRegion={this.state.region}
          onPress={e => this.onPress(e)}
          {...mapOptions}>
          {this.state.polygons.map(polygon => (
            <Polygon
              key={polygon.id}
              coordinates={polygon.coordinates}
              holes={polygon.holes}
              strokeColor="#F00"
              fillColor={colors.p1}
              strokeWidth={1}
            />
          ))}
          {this.state.editing && (
            <Polygon
              key={this.state.editing.id}
              coordinates={this.state.editing.coordinates}
              holes={this.state.editing.holes}
              strokeColor="#000"
              fillColor={colors.p1}
              strokeWidth={1}
            />
          )}
        </MapView>
        <View style={styles.buttonContainer}>
          {/* {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.createHole()}
              style={[styles.bubble, styles.button]}>
              <Text>
                {this.state.creatingHole ? 'Finish Hole' : 'Create Hole'}
              </Text>
            </TouchableOpacity>
          )} */}
          {this.state.editing && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.finish()}
              style={[styles.bubble, styles.button]}>
              <Text style={styles.buttonTxtStyle}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    borderRadius: 100,
    width: width / 2.5,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: colors.p1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  buttonTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
  },
});

export default DrawPolygon;
