import SearchPageModel from "./SearchPageModel";

export default class SourcesPageModel {
    
    static instance = null;
    static getInstance() {
        if (this.instance == null) {
            return new SearchPageModel();
        }
        return this.instance;
    }
    sources;
    get selectedSources() {
        if (this.sources) {
            const selectedSources = this.sources.filter(source => source.isSelected === true);
            return selectedSources > 0 ? selectedSources : null;
        }
        return null;
    }
}