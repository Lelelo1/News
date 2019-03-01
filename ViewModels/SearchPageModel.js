import { decorate, observable, computed } from 'mobx';
import CountryPageModel from './CountryPageModel';
import SourcesPageModel from './SourcesPageModel';
import NewsAPI from 'newsapi';
import { inject, observer } from 'mobx-react';

class SearchPageModel {
    
    static instance = null;

    static getInstance() {
        if (SearchPageModel.instance === null) {
            SearchPageModel.instance = new SearchPageModel();
        }
        return SearchPageModel.instance;
    }

    chosenSources = [];
    getCountry() {
        const c = CountryPageModel.getInstance().countries.find(country => country.isSelected);
        if (c !== undefined) {
            return c.name;
        }
        return '';
    }
    searchType = 'headlines'; // don't use replace when setting
    query;
    getLanguageCountry() {
        return this.searchType === 'headlines' ? 'country' : 'language';
    }
    categories = [
        {
            label: 'Buisness',
            value: 'buisness',
        },
        {
            label: 'Entertainment',
            value: 'entertainment',
        },
        {
            label: 'General',
            value: 'general',
        },
        {
            label: 'Health',
            value: 'health',
        },
        {
            label: 'Science',
            value: 'science',

        },
        {
            label: 'Sports',
            value: 'sports',
        },
        {
            label: 'Technology',
            value: 'technology',
        }
    ]
    selectedCategory = '';
    // when should be empty strings if empty
    canSearch() {
        // headlines
        const countries = CountryPageModel.getInstance().getSelectedCountries();  // returns empty array if filter did not have any matches
        // console.log('countries ' + countries);
        const category = this.selectedCategory; // defaults to null
        const sources = SourcesPageModel.getInstance().selectedSources;
        const q = this.query;
        // if (!category) {}
        let canSearchHeadlines = false;
        if (countries || category || sources || q) {
            canSearchHeadlines = true;
        }
        // everything
        let canSearchArticles = false;
        if (q || sources) { // // or domains has to be specified
            canSearchArticles = true;
        }
        if (this.searchType === 'headlines') {
            return canSearchHeadlines;
        }
        return canSearchArticles;
    }
    articles = [];
    test = 'hej'
}

/*
        const newsAPI = new NewsAPI();
        newsAPI.v2.topHeadlines()
        */

decorate(SearchPageModel, {
    searchType: observable,
    query: observable,
    selectedCategory: observable,
});
// Computed not needed
export default inject('countryPageModel')(observer(SearchPageModel));
