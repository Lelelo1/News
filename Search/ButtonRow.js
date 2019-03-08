import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobeButton from './GlobeButton';
import SearchButton from './SearchButton';
import ClearButton from './ClearButton';

class ButtonRow extends Component {

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <GlobeButton />
                <View style={{ justifyContent: 'space-between' }}>
                    <SearchButton />
                    <ClearButton />
                </View>
            </View>
        );
    }
}
export default ButtonRow;
