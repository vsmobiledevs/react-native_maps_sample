import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView, Dimensions} from 'react-native';
import {AppInput, AppButton} from '../../../components';
import {appIcons} from '../../../utilities';
import ShowSnackBar from '../../../components/ShowSnackBar';
import styles from './styles';

//import redux stuff
import {useDispatch} from 'react-redux';
import {savePolygon} from '../../../redux/actions/home';

const {width} = Dimensions.get('window');

const AddPolygon = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [diemeter, setDiemeter] = useState('');

  //   redux stuff
  const dispatch = useDispatch();

  useEffect(() => {
    setArea(route?.params?.area);
    // setDiemeter(route?.params?.diemeter)
  }, [route.params]);
  const handleSubmit = async () => {
    if (name !== '') {
      const obj = {
        name: name,
        area: route?.params?.area,
        perimeter: 'Empty',
        coords: route?.params?.coords,
      };
      dispatch(savePolygon(obj));
      ShowSnackBar('Record is added successfully');
      setTimeout(() => {
        navigation.navigate('Home');
      }, 500);
    } else {
      ShowSnackBar('Kindly enter the name');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.topView}>
          <Image
            resizeMode="contain"
            source={appIcons.appLogo}
            style={styles.imageStyles}
          />
        </View>
        <View style={styles.inputsView}>
          <AppInput
            value={name}
            placeholder={'Enter Polygon Name'}
            keyboardType={'default'}
            onChangeText={txt => setName(txt)}
          />
          <AppInput
            value={area}
            placeholder={'Polygon Area'}
            keyboardType={'number-pad'}
            onChangeText={txt => setArea(txt)}
            editable={false}
          />
          {/* <AppInput
            value={diemeter}
            placeholder={'Polygon Diemeter'}
            keyboardType={'default'}
            onChangeText={txt => setDiemeter(txt)}
            editable={false}
          /> */}
        </View>
        <View style={styles.bottomView}>
          <AppButton
            btnWidth={width / 2.5}
            onClick={() => handleSubmit()}
            txt="Save"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddPolygon;
