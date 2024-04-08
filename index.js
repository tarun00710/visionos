/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { SecondScreen } from './src/components/SecondScreen';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('SecondScreen', () => SecondScreen);
