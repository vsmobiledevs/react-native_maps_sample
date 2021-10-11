import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StatusBar, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import {colors} from '../../../utilities';
import styles from './styles';

//import redux stuff
import {useSelector} from 'react-redux';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);

  // redux stuff
  const {polygons} = useSelector(state => state.home);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setData(polygons.reverse());
    });
    return unsubscribe;
  }, [navigation, polygons]);

  const renderItem = ({item, index}) => {
    console.log('Item is => ', item);
    return (
      <Card style={{borderRadius: 15}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('ViewPolygon', {item});
          }}
          style={styles.cardView}>
          <Text style={styles.txtStyle}>Name: {item[0]?.name}</Text>
          <Text style={[styles.txtStyle, {marginBottom: 0}]}>
            Area: {item[0]?.area}
          </Text>
          {/* <Text style={[styles.txtStyle, {marginBottom: 0}]}>
            Perimeter: {item[0]?.perimeter}
          </Text> */}
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.p1} barStyle="light-content" />
      <View style={styles.headerView}>
        <Text style={styles.titleTxtStyle}>List Of All Polygons</Text>
      </View>
      <View style={styles.container}>
        {data === undefined || data.length === 0 ? (
          <Text style={styles.recordsTextStyle}>No Records Found</Text>
        ) : (
          <FlatList
            data={data}
            extraData={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <ActionButton
        buttonColor={colors.p1}
        onPress={() => navigation.navigate('DrawPolygon')}
      />
    </View>
  );
};

export default Home;
