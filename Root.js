import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

import {name as appName} from './app.json';

const Root = () => {
  return <App />;
};

AppRegistry.registerComponent(appName, () => Root);