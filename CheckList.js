import React, { Component } from 'react';
import { FlatList, View, Text, Switch } from 'react-native';
import { ListItem } from 'react-native-elements';
import CheckListItem from './CheckListItem';
// import { connect } from 'react-redux';
import { inject, observer, Observer } from 'mobx-react';
import { SearchBar } from 'react-native-elements';

/**
 * requires bindingContext with a setSelected(key) method
 * and also a mobx query observable if search is enabled
 */
class CheckList extends Component {
    
    static getDerivedStateFromProps(props, state) {
        console.log('props changed');
        return { refresh: !state.refresh };
    }
    constructor() {
        super();
        this.state = {
            refresh: false
        };
    }
    componentDidMount() {
        // console.log(SearchParameters.geo.getCountries());
        // SearchParameters.geo.getCountries().then(countries => { console.log(countries); this.setState({ data: countries }); });
        // Promise.all(SearchParameters.geo.getCountries()).then(countries => this.setState({ data: countries }));
        
       // SearchParameters.geo.getCountries().then(countries => this.setState({ data: countries }));
       // this.setState({ data: SearchParameters.geo.getCountries() });
       // this.props.geo.getCountries().then(countries => this.setState({ data: countries }));
    }
    render() {
        // console.log('render: '+ JSON.stringify(this.props.countryPageModel.countries));
        console.log('render data: ' + this.props.data);
        if (this.props.searchEnable) {
            return (
                <View style={{ flex: 1 }}>
                    <SearchBar
                     onChangeText={(text) => { this.props.bindingContext.query = text; }}
                     value={this.props.query} 
                     
                    />
                    <FlatList
                        data={this.props.data}
                        renderItem={this.props.render}
                        extraData={this.state.refresh}
                    />
                </View>
            );
        } else {
            return (
                <FlatList
                    data={this.props.data}
                    renderItem={this.props.render}
                    extraData={this.state.refresh}
                />
            );
        }
    }
}
/*
function mapStateToProps(state) {
    return { store: state.geo };
}
*/
// connect(mapStateToProps)(CountryPage);
export default CheckList;
