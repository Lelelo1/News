import React, { Component } from 'react';
import { View, Text } from 'react-native';
import GlobeButton from './GlobeButton';
import SearchButton from './SearchButton';


class ButtonRow extends Component {

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <GlobeButton />
                <SearchButton />
            </View>
        );
    }
}
export default ButtonRow;
