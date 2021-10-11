import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Dimensions} from 'react-native';
import MapView, {MAP_TYPES, Polygon, PROVIDER_GOOGLE} from 'react-native-maps';
import {colors} from '../../../utilities';
import styles from './styles';

const {height, width} = Dimensions.get('window');
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

const ViewPolygon = ({navigation, route}) => {
  const [region, setRegion] = useState({
    latitude: 37.8025259,
    longitude: -122.4351431,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    const data = route?.params?.item[0]?.coords;
    const reversedCoords = data.map(item => {
      return {latitude: item.latitude, longitude: item.longitude};
    });
    setCoords(reversedCoords);
    setRegion({
      latitude: reversedCoords[0].latitude,
      longitude: reversedCoords[0].longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }, [route?.params]);

  return (
    <View style={styles.mainContainer}>
      <MapView
        style={{flex: 1}}
        mapType={MAP_TYPES.STANDARD}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        zoomEnabled>
        <Polygon
          coordinates={coords}
          fillColor={colors.p1}
          strokeColor="#000"
          strokeWidth={2}
        />
      </MapView>
    </View>
  );
};

export default ViewPolygon;
