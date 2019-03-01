import NewsAPI from 'newsapi';
import  { decorate, computed, observable, toJS, extendObservable, action } from 'mobx';
import { observer } from 'mobx-react';

export default class CountryPageModel {
    static instance = null;

    static getInstance() {
        if (this.instance == null) {
            this.instance = new CountryPageModel();
        }
        return this.instance;
    }
    // can't use geo object and place it there beacuse a second then is needed in getCountries
    // and getCountries create Object object
    query = null;
    countryCodes = [
        'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de',
        'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt',
        'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru',
        'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
    ];
    countries;
    getCountries() {
        if (this.countries) {
            return Promise.resolve(this.countries);
        }
        return Promise.all(
            this.countryCodes.map(async(code) => {
                const flag = `https://www.countryflags.io/${code}/flat/64.png`;
                let name = 'error';
                name = await privateMethods.getFullName(code);
                
                // console.log(name);
                return { key: code, flag, name, isSelected: false };
            }));
    }
    getFilteredCountries() {
        console.log('query: ' + this.query + ' ' + this.countries);
        return this.query ? this.countries.filter(country => country.name.startsWith(this.query)) : this.countries;
    }
    setSelected(key) {
        const deselectCountry = this.countries.find(country => country.isSelected === true && country.key !== key);
        if (deselectCountry !== undefined) {
            deselectCountry.isSelected = false;
        }
        
        const setCountry = this.countries.find(country => country.key === key);
        console.log(setCountry.name);
        console.log(setCountry.isSelected);
        setCountry.isSelected = !setCountry.isSelected;
        console.log(setCountry.isSelected);
        const assert = this.countries.find(country => country.key === key);
        console.log('assert' + assert.name + assert.isSelected);
        
        /*
        const assertCountries = await this.getCountries();
        const c = assertCountries.find(country => country.key === key);
        console.log(c); // the original array of countries should have been modified
        */
    }

    getSelectedCountries() {
        // console.log('selectedCountries');
        if (this.countries) {
            const selectedCountries = this.countries.filter(country => country.isSelected);
            const selectedCountryCodes = selectedCountries.filter(selectedCountry => selectedCountry.key);

            return selectedCountries.length > 0 ? selectedCountryCodes : null;
        }
        return null;
    }
}

decorate(CountryPageModel, {
    search: observable,
    query: observable,
    countries: observable,
//    filteredCountries: computed, // helped against replace is not a function error
});

class CountryItem {
    key
    flag
    name
    isSelected
    constructor(value) {
        this.key = value.key;
        this.flag = value.flag;
    }
}

const privateMethods = {
    async getFullName(code) {
        const response = await fetch(`https://restcountries.eu/rest/v2/alpha?codes=${code}`);
        const json = await response.json();

        return json[0].name;
    }
};
/*
export function reducer(dispatch) {
    console.log('reducer called ' + CountryPageModel.getInstance());
    if (dispatch !== undefined) {
        console.log(dispatch.type);
    }
    return CountryPageModel.getInstance();
}
*/
/* No problem with printing out Object pbject it just means it is in json and has to be
printed out with JSON.stringify();
*/
