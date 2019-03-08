/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, List, AppState, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'mobx-react';
import NewsAPI from 'newsapi';
import SearchPage from './SearchPage';
import CountryPage from './CountryPage';
import LanguagePage from './LanguagePage';
import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
import CountryPageModel, { reducer } from './ViewModels/CountryPageModel';
import SearchPageModel from './ViewModels/SearchPageModel';
import LanguagePageModel from './ViewModels/LanguagePageModel';
import SourcesPageModel from './ViewModels/SourcesPageModel';
import ArticlePage from './ArticlePage';
import SourcesPage from './SourcesPage';

/*
const tabs = createBottomTabNavigator({
  Search: { screen: SearchPage },
  Sources: { screen: SourcesPage }
});
*/

const Navigation = createStackNavigator(
  {
    Search: { screen: SearchPage },
    Country: { screen: CountryPage },
    Language: { screen: LanguagePage },
    Article: { screen: ArticlePage },
    Sources: { screen: SourcesPage }
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
componentDidMount() {
  AppState.addEventListener('change', this.handleAppStateExit);
  this.loadPreferences();
}
componentWillUnmount() {
  AppState.removeEventListener('change', this.handleAppStateExit);
}
handleAppStateExit = (nextAppState) => {
  if (nextAppState === 'inactive') {
    console.log('app is shutting down');
    this.savePreferences();
  }
}
// consider saving to azure instead - so that preferences is shared between devices with app installed
async savePreferences() {
  const search = SearchPageModel.getInstance();
  const setQuery = search.query ? search.query : '';
  console.log('setQuery: ' + setQuery);
  await AsyncStorage.setItem('query', setQuery);
  const setCategory = search.selectedCategory ? search.selectedCategory : '';
  await AsyncStorage.setItem('category', setCategory);
  const countryPageModel = CountryPageModel.getInstance();
  // only stringfy if properties contains value or error is thrown
  const setCountry = countryPageModel.countries ? JSON.stringify(countryPageModel.countries) : '';
  console.log('setCountry: ' + setCountry);
  await AsyncStorage.setItem('countries', setCountry);
  const languagePageModel = LanguagePageModel.getInstance();
  const setLanguage = languagePageModel.languages ? JSON.stringify(languagePageModel.languages) : '';
  console.log('setLanguage: ' + setLanguage);
  await AsyncStorage.setItem('languages', setLanguage);
  const sourcesPageModel = SourcesPageModel.getInstance();
  const setSource = sourcesPageModel.previousSelectedSources() ?
  JSON.stringify(sourcesPageModel.previousSelectedSources()) : '';
  console.log('setSource: ' + setSource);
  await AsyncStorage.setItem('sources', setSource);
}
async loadPreferences() {
  // console.log('loading prefrences');
  const search = SearchPageModel.getInstance();
  const query = await AsyncStorage.getItem('query');
  if (query) {
    search.query = query;
  }
  const category = await AsyncStorage.getItem('category');
  if (category) {
    search.selectedCategory = category;
  } 
  const countryPageModel = CountryPageModel.getInstance();
  const countries = await AsyncStorage.getItem('countries');
  if (countries) {
    countryPageModel.countries = JSON.parse(countries);
  }
  const languagePageModel = LanguagePageModel.getInstance();
  const languages = await AsyncStorage.getItem('languages');
  if (languages) {
    languagePageModel.languages = JSON.parse(languages);
  }
  const sourcesPageModel = SourcesPageModel.getInstance();
  const sources = await AsyncStorage.getItem('sources');
  if (sources) {
    sourcesPageModel.sources = JSON.parse(sources);
  }
}
  render() {
    return (
      <Provider
       countryPageModel={CountryPageModel.getInstance()}
       searchPageModel={SearchPageModel.getInstance()}
       languagePageModel={LanguagePageModel.getInstance()}
       sourcesPageModel={SourcesPageModel.getInstance()}
      >
        <AppContainer />
      </Provider>
    );
  }
}

// previous issue with mobx setting .babelrc
