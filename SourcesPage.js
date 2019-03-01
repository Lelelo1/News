import React, { Component } from 'React';
import { View, Text } from 'react-native';

export default class SourcesPage extends Component {
    static navigationOptions = {
        title: 'Sources'
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <Text>SourcesPage</Text>
                
            </View>
        );
    }
}