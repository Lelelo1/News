import { decorate, observable } from 'mobx';

export default class SourcesPageModel {
    
    static instance = null;

    static getInstance() {
        if (this.instance === null) {
            this.instance = new SourcesPageModel();
        }
        return this.instance;
    }
    
    text = 't';
}

decorate(SourcesPageModel, {
    text: observable
});
