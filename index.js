/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name } from './app.json';

if (__DEV__) {
    require("./ReactotronConfig");
}
AppRegistry.registerComponent(name, () => App);
