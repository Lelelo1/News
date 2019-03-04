import SearchPageModel from "./SearchPageModel";

export default class SourcesPageModel {
    
    static instance = null;
    static getInstance() {
        if (this.instance == null) {
            this.instance = new SourcesPageModel();
        }
        return this.instance;
    }
    sources;
    selectedSources() {
        if (this.sources) {
            const selectedSources = this.sources.filter(source => source.isSelected === true);
            return selectedSources > 0 ? selectedSources : null;
        }
        return null;
    }
    
}