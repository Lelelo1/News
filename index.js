import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import SearchPage from './SearchPage';

AppRegistry.registerComponent(appName, () => App);
