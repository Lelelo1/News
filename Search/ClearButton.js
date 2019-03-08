import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { moderateScale, scale } from 'react-native-size-matters';
import { inject, observer } from 'mobx-react';
import SearchPageModel from '../ViewModels/SearchPageModel';
import CountryPageModel from '../ViewModels/CountryPageModel';
import LanguagePageModel from '../ViewModels/LanguagePageModel';
import SourcesPageModel from '../ViewModels/SourcesPageModel';

class ClearButton extends Component {
    clearAllSelectedPreferences() {
        console.log('clearing all selected preferences');
        const search = SearchPageModel.getInstance();
        search.query = null;
        search.selectedCategory = null;
        const countryPageModel = CountryPageModel.getInstance();
        if (countryPageModel.countries) { // needs to be redone if I start support multiple country selection
            const deselectCountry = countryPageModel.countries.find(country => country.isSelected); // <-- find
            if (deselectCountry) {
                deselectCountry.isSelected = false;
            }
        }
        const languagePageModel = LanguagePageModel.getInstance();
        if (languagePageModel.languages) {
            const selectedLanguages = languagePageModel.languages.filter(language => language.isSelected);
            selectedLanguages.forEach(selectedLanguage => {
                selectedLanguage.isSelected = false; // might want to disable no param reassign rule
            });
        }
        const sourcesPageModel = SourcesPageModel.getInstance();
        if (sourcesPageModel.previousSelectedSources()) {
            sourcesPageModel.previousSelectedSources().forEach(selectedSource => {
                selectedSource.isSelected = false; // here too.
            });
        }
    }
    render() {
        return (
            <TouchableOpacity
             style={{ alignSelf: 'flex-end', marginRight: scale(5) }}
             disabled={!this.props.searchPageModel.canSearch()}
             onPress={() => this.clearAllSelectedPreferences()}
            >
                <Icon name={'clear'} size={moderateScale(17)} color={this.props.searchPageModel.canSearch() ? 'black' : 'transparent'} />
            </TouchableOpacity>
        );
    }
}

export default inject('searchPageModel')(observer(ClearButton));
