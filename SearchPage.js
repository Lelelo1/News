import React, { Component } from 'react';
import { AppRegistry, ScrollView, FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { App } from './App';
import SearchPageModel from './ViewModels/SearchPageModel';
import SearchArea from './Search/SearchArea';
// import { SafeAreaView } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import RNPickerSelect from 'react-native-picker-select';

class SearchPage extends Component {
  static navigationOptions = {
    title: 'Articles'
  }

  constructor(props) {
    super(props);
    this.state = {
      outputText: 'You are welcome to this react native page, ',
      iconName: 'new',
    };

  }
  handleSearchType(event) {
    if (this.state.iconName === 'infinity') {
      this.setState({ iconName: 'new' });
    }
    else {
      this.setState({ iconName: 'infinity' });
      this.setState({ outputText: SearchPageModel.country });
    }
  }
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#fff'}}>
        <ScrollView style={{ backgroundColor: '#fff' }}>
          
          <SearchArea navigation={this.props.navigation} />
          <TextInput style={{ height: 40 }} onSubmitEditing={(event) => { this.setState({ outputText: this.state.outputText + event.nativeEvent.text }); }} />
          <FlatList
            data={[
              {key: 'Devin'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
            ]}
            renderItem={({ item }) => <ListItem title={item.key} subtitle={item.key + ' something'} />}
            style={{ backgroundColor: '#c7d6e0' }}
          />
      <TouchableOpacity
      style={{ width: 80, height: 60, backgroundColor: 'green' }} onPress={() => {
        this.props.navigation.navigate('Sources');
      }}
      />
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
export default inject('searchPageModel')(observer(SearchPage));
/*
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => FlatListBasics);
*/

// use this as default country/language setting https://usercountry.com