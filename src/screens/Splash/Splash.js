import React, {useEffect} from 'react';
import {Image, SafeAreaView} from 'react-native';
import styles from './styles';
import {appIcons} from '../../utilities';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('App');
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <Image
        resizeMode="contain"
        source={appIcons.appLogo}
        style={styles.imageStyles}
      />
    </SafeAreaView>
  );
};

export default Splash;
