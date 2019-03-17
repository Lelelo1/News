import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { inject, observer, Observer } from 'mobx-react';
import SourcesPageModel from './ViewModels/SourcesPageModel';
import CheckListItem from './CheckListItem';
import CheckList from './CheckList';
import SearchPageModel from './ViewModels/SearchPageModel';
import LanguagePageModel from './ViewModels/LanguagePageModel';
import CountryPageModel from './ViewModels/CountryPageModel';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Divider } from 'react-native-elements';

class SourcesPage extends Component {
    static navigationOptions= {
        title: 'Sources'
    }

    static getDerivedStateFromProps(props, state) {
        console.log('props changed');
        return { refresh: !state.refresh };
    }
    constructor() {
        super();
        this.state = {
            refresh: false
        };
    }
    componentDidMount() {
        this.load();
        this.props.navigation.addListener('willFocus', () => this.load);
    }
    load() {
        SourcesPageModel.getInstance().getSources();
    }
    capitalizeFirstLetter(string) {
        if (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return null;
    }
    renderText() {
        let category = this.capitalizeFirstLetter(SearchPageModel.getInstance().selectedCategory);
        if (category) {
            category = 'Category: ' + category;
        }
        let languages = LanguagePageModel.getInstance().selectedLanguages();
        if (languages) {
            languages = languages.map(language => language.name);
            languages = languages.toString();
            languages = languages.replace(/,/g, ', ');
            if (LanguagePageModel.getInstance().selectedLanguages().length > 1) {
                languages = 'Languages: ' + languages;
            } else {
                languages = 'Language: ' + languages;
            }
        }
        let countries = CountryPageModel.getInstance().selectedCountries();
        if (countries) {
            countries = countries.map(country => country.name);
            // need to do same as with langauges if implementing multiselect countries
            countries = 'Country: ' + countries;
        }
        const shouldRender = (category || languages || countries);
        return shouldRender ?
        <View style={{ flex: 1, paddingHorizontal: scale(20), paddingVertical: verticalScale(10), justifyContent: 'space-between' }}>
            <Text style={{ alignSelf: 'center' }}>{category} {languages} {countries}</Text>
            <Divider />
        </View>
          :
         null
        ;
    }
    render() {
        console.log('render sourcePage');
        
        return (
            <View style={{ flex: 1 }}>
                <CheckList
                 listHeaderComponent={this.renderText()}
                 data={this.props.sourcesPageModel.sources}
                 bindingContext={SourcesPageModel.getInstance()}
                />
            </View>
        );
    }
}

export default inject('sourcesPageModel')(observer(SourcesPage));
