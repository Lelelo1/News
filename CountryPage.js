import React, { Component } from 'react';
import { FlatList, View, Text, Switch } from 'react-native';
import { ListItem } from 'react-native-elements';
import CheckListItem from './CheckListItem';
import CheckList from './CheckList';
// import { connect } from 'react-redux';
import { inject, observer, Observer } from 'mobx-react';
import { toJS, decorate } from 'mobx';
import CountryPageModel from './ViewModels/CountryPageModel';
import { fromPromise } from 'mobx-utils';
import { SearchBar } from 'react-native-elements';

class CountryPage extends Component {
    
    static navigationOptions = {
        title: 'Country',
    }

    componentDidMount() {
        // console.log(SearchParameters.geo.getCountries());
        // SearchParameters.geo.getCountries().then(countries => { console.log(countries); this.setState({ data: countries }); });
        // Promise.all(SearchParameters.geo.getCountries()).then(countries => this.setState({ data: countries }));
        
       // SearchParameters.geo.getCountries().then(countries => this.setState({ data: countries }));
       // this.setState({ data: SearchParameters.geo.getCountries() });
       // this.props.geo.getCountries().then(countries => this.setState({ data: countries }));
        this.loadAllCountries();
    }
    loadAllCountries() {
       // replace only works for strings which observable seem to be https://stackoverflow.com/questions/39543194/mobx-replacing-item-in-observable-array
       CountryPageModel.getInstance().getCountries().then(countries => { CountryPageModel.getInstance().countries = countries; }).then(() => { CountryPageModel.getInstance().query = ''; });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <CheckList
                 searchEnable={true}
                 query={this.props.countryPageModel.query}
                 data={this.props.countryPageModel.getFilteredCountries()}
                 onSelect={CountryPageModel.getInstance()}
                 bindingContext={CountryPageModel.getInstance()}
                />
            </View>
        );
    }
}
/*
function mapStateToProps(state) {
    return { store: state.geo };
}
*/
// connect(mapStateToProps)(CountryPage);
export default inject('countryPageModel')(observer(CountryPage));
