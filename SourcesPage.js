import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { inject, observer, Observer } from 'mobx-react';
import SourcesPageModel from './ViewModels/SourcesPageModel';
import CheckListItem from './CheckListItem';
import CheckList from './CheckList';

class SourcesPage extends Component {
    static navigationOptions= {
        title: 'Sources'
    }

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
        this.load();
        this.props.navigation.addListener('willFocus', () => this.load);
    }
    load() {
        SourcesPageModel.getInstance().getSources();
    }
    render() {
        console.log('render sourcePage');
        return (
            <View style={{ flex: 1 }}>
                <CheckList
                 data={this.props.sourcesPageModel.sources}
                 bindingContext={SourcesPageModel.getInstance()}
                />
            </View>
        );
    }
}

export default inject('sourcesPageModel')(observer(SourcesPage));
