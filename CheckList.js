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
            refresh: false,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]
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
    getSource(flag) {
        if (flag) {
            return { source: { uri: flag } };
        }
        return null;
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
                        renderItem={({ item, index }) => {    
                        
                        return (<Observer>
                            {() => 
                            <CheckListItem
                            title={item.name}
                            leftAvatar={this.getSource(item.flag)}
                            isSelected={item.isSelected}
                            onSelect={() => { this.props.bindingContext.setSelected(item.key); }}
                            />
                            }
                        </Observer>);
                        }}
                        extraData={this.state.refresh}
                    />
                </View>
            );
        } else {
            return (
                <FlatList
                    data={this.props.data}
                    renderItem={({ item, index }) => {
                        
                        return (<Observer>
                            {() => 
                            <CheckListItem
                            title={item.name}
                            leftAvatar={this.getSource(item.flag)}
                            isSelected={item.isSelected}
                            onSelect={() => { this.props.bindingContext.setSelected(item.key); }}
                            />
                            }
                        </Observer>);
                    }}
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
