import React from 'react';
import {LogBox} from 'react-native';
import MainNavigation from './src/navigation';

// redux stuff
import {Provider} from 'react-redux';
import {persister, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/lib/integration/react';

// ignore warnings
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <MainNavigation />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
