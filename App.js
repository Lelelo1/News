/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, List } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'mobx-react';
import NewsAPI from 'newsapi';
import SearchPage from './SearchPage';
import SourcesPage from './SourcesPage';
import CountryPage from './CountryPage';
import LanguagePage from './LanguagePage';

import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
import CountryPageModel, { reducer } from './ViewModels/CountryPageModel';
import SearchPageModel from './ViewModels/SearchPageModel';
import LanguagePageModel from './ViewModels/LanguagePageModel';

/*
const tabs = createBottomTabNavigator({
  Search: { screen: SearchPage },
  Sources: { screen: SourcesPage }
});
*/

const Navigation = createStackNavigator(
  {
    Search: { screen: SearchPage },
    Sources: { screen: SourcesPage },
    Country: { screen: CountryPage },
    Language: { screen: LanguagePage }
  },
  {
    initialRouteKey: 'Search'
  }
);

const AppContainer = createAppContainer(Navigation);
// const store = createStore(reducer);

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <Provider
       countryPageModel={CountryPageModel.getInstance()}
       searchPageModel={SearchPageModel.getInstance()}
       languagePageModel={LanguagePageModel.getInstance()}
      >
        <AppContainer />
      </Provider>
    );
  }
}

// previous issue with mobx setting .babelrc
