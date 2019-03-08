import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { inject, observer, Observer } from 'mobx-react';
import SourcesPageModel from './ViewModels/SourcesPageModel';
import CheckListItem from './CheckListItem';

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
                <FlatList 
                 data={this.props.sourcesPageModel.sources}
                 renderItem={({ item }) => {
                     return ( // important Observer for changes to take effect in CheckListItem
                     <Observer> 
                        {() =>
                            <CheckListItem
                            title={item.name}
                            isSelected={item.isSelected}
                            onSelect={() => { this.props.sourcesPageModel.setSelected(item.id); console.log('onSelect: ' + item.name)}}
                            />
                        }
                    </Observer>
                     );
                 }}
                 extraData={this.state.refresh}
                />
            </View>
        );
    }
}

export default inject('sourcesPageModel')(observer(SourcesPage));
