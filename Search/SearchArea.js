import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import SearchRow from './SearchRow';
import ButtonRow from './ButtonRow';

import { verticalScale, moderateScale } from 'react-native-size-matters';
import CategoryArea from './CategoryArea';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

class SearchArea extends Component {

    render() {
        return (
            <View style={{ flex: 1, width: '100%', height: this.props.height }}>
                <View style={{ flex: 1, marginHorizontal: '4%', marginVertical: '1%', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <SearchRow />
                    <ButtonRow />
                    <CategoryArea />
                </View>
            </View>
        );
    }
}

export default SearchArea;
