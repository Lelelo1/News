import React, { Component } from 'react';
import { AppRegistry, ScrollView, FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import MultiSwitch from 'react-native-multi-switch';
import { App } from './App';
import SearchArea from './Search/SearchArea';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Entypo'
import LevelSlider from './LevelSlider/LevelSlider'
import { moderateScale, scale } from 'react-native-size-matters';
import SearchPageModel from './ViewModels/SearchPageModel';

let self;
class SearchPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text 
       style={{ fontSize: 18, fontWeight: '500' }}
       onPress={() => { self.flatList.scrollToOffset({ animated: true, offset: 0 }); }}
      >Search
      </Text> // check how it look on android compare to other screen titles
    ),
    headerRight: (
      <TouchableOpacity
       style={{ paddingRight: scale(12) }}
       onPress={() => {
          navigation.navigate('Sources');
       }}
      >
      <Icon name='open-book' size={30} />
    </TouchableOpacity> // make greyed out and disabled when either country or category is selected
    ) });

  constructor(props) {
    super(props);
    this.state = {
      outputText: 'You are welcome to this react native page, ',
      iconName: 'new',
      searchAreaHeight: moderateScale(210),
    };
    self = this;
  }

  getSource(urlToImage) {
    if (urlToImage) {
        return { source: { uri: urlToImage } };
    }
    return null;
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
  selectArticle(article) {
    SearchPageModel.getInstance().selectedArticle = article;
    this.props.navigation.navigate('Article');
  }
  listItem(item) {
    const level = this.props.searchPageModel.level;
    switch (level) {
      case 0 : {
        return (
          <ListItem
            bottomDivider={true}
            title={<Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>}
            rightIcon={{ name: 'chevron-right', size: 18 }} 
            onPress={() => { this.selectArticle(item); }}
          />
        );
      }
      // this.selectArticle(item);
      case 1 : {
        return (
          <ListItem
            title={<Text style={{ fontSize: 23, fontWeight: 'bold' }}>{item.title}</Text>}
            subtitle={<Text style={{ fontSize: 12 }}>{item.description}</Text>}
            subtitleProps={{ fontSize: 10, color: 'grey' }}
            rightIcon={{ name: 'chevron-right', size: 18 }}
            onPress={() => { this.selectArticle(item); }}
          />
        );    
      }
      case 2 : {
        return (
          <ListItem 
            leftAvatar={this.getSource(item.urlToImage)}
            title={<Text style={{ fontSize: 23, fontWeight: 'bold' }}>{item.title}</Text>}
            subtitle={<Text style={{ fontSize: 12 }}>{item.description}</Text>}
            subtitleProps={{ fontSize: 10, color: 'grey' }}
            rightIcon={{ name: 'chevron-right', size: 18 }}
            onPress={() => { this.selectArticle(item); }}
          />
        );
      }
      default : {
        // this.scrollView.scrollTo(this.state.searchAreaHeight, true);
        return (<ListItem 
        leftAvatar={this.getSource(item.urlToImage)}
        title={<Text style={{ fontSize: 23, fontWeight: 'bold' }}>{item.title}</Text>}
        subtitle={<Text style={{ fontSize: 12 }}>{item.description}</Text>}
        subtitleProps={{ fontSize: 10, color: 'grey' }}
        rightIcon={{ name: 'chevron-right', size: 18 }}
        onPress={() => { this.selectArticle(item); }}
        />);
      }
    }
  }

  componentDidUpdate() {
    const articles = this.props.searchPageModel.articles;
    if (articles) {
      if (articles.length > 0) {
        this.flatList.scrollToOffset({ animated: true, offset: this.state.searchAreaHeight });
      }
    }
  }
  renderSearchArea() {
    return (
      <View>
        <SearchArea navigation={this.props.navigation} height={this.state.searchAreaHeight} />
        <LevelSlider levels={4} width={180} circleSize={17} bindingContext={this.props.searchPageModel} />  
        <ActivityIndicator animating={this.props.searchPageModel.isSearching} />
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#fff'}}>
        
          <FlatList
            ref={(ref) => { this.flatList = ref; }}
            ListHeaderComponent={this.renderSearchArea()}
            data={this.props.searchPageModel.articles}
            renderItem={({ item, index }) => {
              return this.listItem(item); 
            }}
            onEndReached={() => {
              console.log('onEndReached');
            }}
            onEndReachedThreshold={0.1}
            
            /*
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            */
            /*
            onEndReached={({ distanceFromEnd }) => {
              this.onEndReached(distanceFromEnd);
            }}
            onEndReachedThreshold={0}
            onMomentumScrollBegin={() => { this.flatList.onEndReachedCalledDuringMomentum = false; }}
            */
           
          />
      
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
export default withNavigation(inject('searchPageModel')(observer(SearchPage)));
/*
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => FlatListBasics);
*/

// use this as default country/language setting https://usercountry.com