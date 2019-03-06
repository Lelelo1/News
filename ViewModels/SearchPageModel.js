import { decorate, observable, computed } from 'mobx';
import CountryPageModel from './CountryPageModel';
import NewsAPI from 'newsapi';
import { inject, observer } from 'mobx-react';
// import { toJS } from 'mobx';
import LanguagePageModel from './LanguagePageModel';

class SearchPageModel {
    
    static instance = null;

    static getInstance() {
        if (this.instance === null) {
            this.instance = new SearchPageModel();
        }
        return this.instance;
    }

    chosenSources = [];
    getCountry() {
        if (CountryPageModel.getInstance().countries) {
            const c = CountryPageModel.getInstance().countries.find(country => country.isSelected);
            if (c !== undefined) {
                return c.name;
            }
        }
        
        return '';
    }
    searchType = 'headlines'; // don't use replace when setting
    query;
    getQuery() {
        if (this.query) {
            return this.isEmptyOrSpaces(this.query) ? null : this.query;
        }
        return this.query;
    }
    isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
    }
    
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
        const countries = CountryPageModel.getInstance().selectedCountries();  // returns empty array if filter did not have any matches
        // console.log('countries ' + countries);
        const category = this.selectedCategory; // defaults to null
        const sources = '';
        // SourcesPageModel.getInstance().selectedSources();
        const q = this.getQuery();
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
    isSearching = false;
    articles;
    getArticles() {
        this.isSearching = true;
        const newsAPI = new NewsAPI('1e0e39fff2c74b079cfe4ff1b8f3e78d');
        let promise;
        // const sources = SourcesPageModel.getInstance().selectedSources(); // maybe format
        const sources = '';
        if (this.searchType === 'headlines') {
            console.log('headlines search');
            if (sources) {
                promise = newsAPI.v2.topHeadlines({ q: this.query, sources });
            } else {
                const country = CountryPageModel.getInstance().selectedCountries();
                const category = this.selectedCategory;
                promise = newsAPI.v2.topHeadlines({ q: this.query, country, category });
            }
        } else {
            const language = LanguagePageModel.getInstance().selectedLanguages(); // limit to one language

            console.log(sources);
            promise = newsAPI.v2.everything({ q: this.getQuery(), language, sources });
            console.log(promise);
        }
        promise.then(res => { console.log(res); this.articles = res.articles; console.log('articles: ' + this.articles); this.isSearching = false; });
    }
    test = 'no';
    level = 0;
    setLevel(level) {
        if (level !== this.level) {
            // refresh articles
            const articles = this.articles;
            this.articles = null;
            this.articles = articles;
        }
        this.level = level;
    }
    selectedArticle;
}

/*
        const newsAPI = new NewsAPI();
        newsAPI.v2.topHeadlines()
        */

decorate(SearchPageModel, {
    searchType: observable,
    query: observable,
    selectedCategory: observable,
    isSearching: observable,
    articles: observable,
    level: observable,
    selectedArticle: observable
});
// Computed not needed
export default inject('countryPageModel')(observer(SearchPageModel));
