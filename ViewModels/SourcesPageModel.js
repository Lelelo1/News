import { decorate, observable } from 'mobx';
import NewsAPI from 'newsapi';
import SearchPageModel from './SearchPageModel';
import LanguagePageModel from './LanguagePageModel';
import CountryPageModel from './CountryPageModel';

export default class SourcesPageModel {
    
    static instance = null;

    static getInstance() {
        if (this.instance === null) {
            this.instance = new SourcesPageModel();
        }
        return this.instance;
    }
    
    query = 't';
    sources;

    getSources() {
        console.log('getting sources');
        const search = SearchPageModel.getInstance();
        const category = search.selectedCategory;
        const language = LanguagePageModel.getInstance().selectedLanguages(); // limit to one language
        const country = CountryPageModel.getInstance().selectedCountries();
        console.log('with country: ' + country);
        const newsAPI = new NewsAPI('1e0e39fff2c74b079cfe4ff1b8f3e78d');
        const promise = newsAPI.v2.sources({ category, language, country });
        promise.then((res) => { this.sources = res.sources.map(source => { const s = source; s.isSelected = false; return s; }); });   
    }
    setSelected(id) {
        console.log('id: ' + id);
        const setSource = this.sources.find(source => id === source.id);
        console.log(setSource);
        // console.log('set: ' + setSource.id + ' ' + setSource.isSelected);
        setSource.isSelected = !setSource.isSelected;
    }
    selectedSources() {
        if (this.sources) {
            const selectedSources = this.sources.filter(source => source.isSelected);
            const selectedSourcesNames = selectedSources.map(source => source.id);
            return selectedSourcesNames.length > 0 ? selectedSourcesNames : null;
        }
        return null;
    }
}

decorate(SourcesPageModel, {
    sources: observable
});
