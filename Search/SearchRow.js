import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AutoComplete from 'react-native-autocomplete-input';
import { inject, observer } from 'mobx-react';
import StateButton from './StateButton';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SearchPageModel from '../ViewModels/SearchPageModel';


class SearchRow extends Component {
    
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <StateButton />
                <View>
                    <AutoComplete
                     style={{ width: scale(270), height: verticalScale(30), fontSize: moderateScale(16) }}
                     placeholder={'Search ' + this.props.searchPageModel.searchType}
                     onChangeText={(text) => { console.log('text: ' + text); SearchPageModel.getInstance().query = text; }}
                     value={this.props.searchPageModel.query}
                    />
                    <Text style={{ alignSelf: 'flex-end', fontSize: moderateScale(7) }}>powered by News API</Text>
                </View>
            </View>
        );
    }
}

export default inject('searchPageModel')(observer(SearchRow));
