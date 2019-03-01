import React, { Component } from 'react';
import { View, Text, TextInput, Animated } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import RNPickerSelect from 'react-native-picker-select';
import { inject, observer } from 'mobx-react';
import SearchPageModel from '../ViewModels/SearchPageModel';

class CategoryArea extends Component {
    
    /*
    componentDidUpdate() {
        if (this.view) {
            this.view.flash();
        }
    }
    */

    // handleViewRef = ref => this.view = ref;

    render() {
        if (this.props.searchPageModel.searchType === 'articles') {
            return null;
        }
        return (
            
            
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: moderateScale(11) }} >Select a category</Text>
                    <RNPickerSelect
                     items={this.props.searchPageModel.categories}
                     placeholderTextColor={'black'}
                     placeholder={{ label: 'Unspecified' }}
                     textInputProps={{
                     backgroundColor: 'pink',
                     textAlign: 'center',
                     height: moderateScale(31),
                     width: moderateScale(125),
                     alignSelf: 'center',
                     borderRadius: moderateScale(45),
                     fontSize: moderateScale(13),
                    }}
                    onValueChange={(value) => { SearchPageModel.getInstance().selectedCategory = value; }}
                    value={SearchPageModel.getInstance().selectedCategory}
                />
            </View>

        );
    }
}

export default inject('searchPageModel')(observer(CategoryArea));
