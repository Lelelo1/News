import React, { Component } from 'react';
import { TouchableOpacity, View, Text} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SearchPageModel from '../ViewModels/SearchPageModel';
import { inject, observer } from 'mobx-react';

import * as Animatable from 'react-native-animatable';

class SearchButton extends Component {

    /*
    componentDidUpdate(prevProps, prevState) {
        console.log('update: ' + prevProps.searchPageModel.canSearch());
        
        if (this.props.searchPageModel.canSearch()
         && lastProps.searchPageModel.canSearch() !== this.props.searchPageModel.canSearch()) {
            this.text.jello();
        }
        
    }
    lastProp = this.props.searchPageModel.canSearch();
    */
    
    // fire animation only once when canSearch changes to true and it was not caused by change of searchType
    canSearch = SearchPageModel.getInstance().canSearch();
    searchType = SearchPageModel.getInstance().searchType;
    componentWillReact() {
        const canSearch = this.props.searchPageModel.canSearch();
        const searchType = this.props.searchPageModel.searchType;
        if (canSearch && this.canSearch !== canSearch && this.searchType === searchType) {
            this.text.jello(1000);
        }
        this.canSearch = canSearch;
        this.searchType = searchType;
    }
    
    
    render() {
        return (
            <TouchableOpacity
             style={{ backgroundColor: 'pink', width: scale(225), height: moderateScale(35) }}
             onPress={() => {
               SearchPageModel.getInstance().getArticles();
             }}
             disabled={!this.props.searchPageModel.canSearch()}
            >
                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                    <Animatable.Text ref={(ref) => { this.text = ref; }} style={this.props.searchPageModel.canSearch() ? styles.textEnabled : styles.textDisabled}>Search</Animatable.Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = {
    textEnabled: {
        fontSize: moderateScale(18),
        color: '#000000'
    },
    textDisabled: {
        fontSize: moderateScale(18),
        color: '#8e8e8e'
    }
};
export default inject('searchPageModel')(observer(SearchButton));
