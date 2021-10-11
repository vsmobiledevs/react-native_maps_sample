import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../../screens/Home/Home';
import DrawPolygon from '../../screens/Home/DrawPolygon';
import AddPolygon from '../../screens/Home/AddPolygon';
import ViewPolygon from '../../screens/Home/ViewPolygon';

const Stack = createNativeStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddPolygon" component={AddPolygon} />
      <Stack.Screen name="DrawPolygon" component={DrawPolygon} />
      <Stack.Screen name="ViewPolygon" component={ViewPolygon} />
    </Stack.Navigator>
  );
}

export default HomeStack;
