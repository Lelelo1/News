import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react';

class SourcesPage extends Component {
    static navigationOptions= {
        title: 'Sources'
    }
    render() {
        return (
            <View>
                <Text>Sources page</Text>
                <Button
                 title={this.props.sourcesPageModel.text} 
                 onPress={() => {
                    this.props.sourcesPageModel.text = 'whooo';
                 }}
                />
            </View>
        );
    }
}

export default inject('sourcesPageModel')(observer(SourcesPage));
