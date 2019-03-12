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
        const language = LanguagePageModel.getInstance().selectedLanguageCodes(); // limit to one language
        const country = CountryPageModel.getInstance().selectedCountryCodes();
        console.log('with category: ' + category);
        console.log('with country: ' + country);
        console.log('with langauge: ' + language);
        const newsAPI = new NewsAPI('1e0e39fff2c74b079cfe4ff1b8f3e78d');
        const promise = newsAPI.v2.sources({ category, language, country });
        promise.then((res) => {
             const previousSelectedSources = this.previousSelectedSources();
             console.log('previousSources: ' + JSON.stringify(previousSelectedSources));
             
             let newSources = res.sources.map(source => { return { key: source.id, name: source.name, isSelected: false }; }); //<-- test here
                                                        // source.isSelected = false; source.key = source.id; return source;
                                                        // const s = source; s.isSelected = false; s.key = s.id; return s;
             /*
             if (previousSelectedSources) {
                    newSources = newSources.filter(source => !this.existsIn(source, previousSelectedSources));
                    console.log('filteredNewSources: ' + JSON.stringify(newSources));
                    console.log('join: ' + JSON.stringify(previousSelectedSources));
                    newSources = newSources.concat(previousSelectedSources);
                }
            */
             newSources = newSources.slice(0, 16); // 14 -> 15
            console.log('sources: ' + JSON.stringify(newSources));
            this.sources = newSources;
            console.log('Sources: ' + JSON.stringify(this.sources));
        });   
    }
    previousSelectedSources() { // can't uses selectedSources() as it returns only the id
        if (this.sources) {
            return this.sources.filter(source => source.isSelected);
        }
        return null;
    }
    existsIn(source, previousSources) {
        return previousSources.find(s => source.id === s.id);
    }
    setSelected(key) {
        const setSource = this.sources.find(source => key === source.key);
        console.log('selecting ' + JSON.stringify(setSource));
        // console.log('set: ' + setSource.id + ' ' + setSource.isSelected)
        setSource.isSelected = !setSource.isSelected;
    }
    selectedSources() {
        if (this.sources) { 
            const selectedSources = this.sources.filter(source => source.isSelected);
            const selectedSourcesNames = selectedSources.map(source => source.key);
            return selectedSourcesNames.length > 0 ? selectedSourcesNames : null;
        }
        return null;
    }
}

decorate(SourcesPageModel, {
    sources: observable
});
