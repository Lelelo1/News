import { decorate, observable, computed } from "mobx";

export default class LanguagePageModel {
    static instance = null;

    static getInstance() {
        console.log('instance: ' + this.instance);
        if (this.instance == null) {
            this.instance = new LanguagePageModel();
        }
        return this.instance;
    }

    languageCodes = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'se', 'zh'];
    // ud - what is language is ud?
    languageFullNames = ['Arabic', 'German', 'English', 'Spanish', 'French', 'Hebrew', 'Italian', 'Dutch', 'Norwegian', 'Portuguese', 'Russian', 'Swedish', 'Chinese']; 
    languages;
    getLanguages() {
        if (this.languages) {
            return this.languages;
        }
        this.languages = [];
            for (let i = 0; i < this.languageCodes.length; i++) {
                this.languages[i] = { key: this.languageCodes[i], flag: null, name: this.languageFullNames[i], isSelected: false };
            }
        console.log(this.languages);
        return this.languages;
    }
    setSelected(key) {
        const setLanguage = this.languages.find(language => language.key === key);
        setLanguage.isSelected = !setLanguage.isSelected;
    }
    selectedLanguages() {
        if (this.languages) {
            const selectedLanguages = this.languages.filter(language => language.isSelected);
            const selectedLanguageCodes = selectedLanguages.map(selectedLanguage => selectedLanguage.key);
            return selectedLanguageCodes.length > 0 ? selectedLanguageCodes : null;
        }
        return null;
    }
}
decorate(LanguagePageModel, {
    languages: observable,
});

