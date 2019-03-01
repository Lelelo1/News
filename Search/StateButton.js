import React, { Component } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import SearchPageModel from '../ViewModels/SearchPageModel';
import { moderateScale } from 'react-native-size-matters';

const screenWidth = Dimensions.get('screen').width;

class StateButton extends Component {
    state = {
        iconName: 'new'
    }
    render() {
        return (
            <TouchableOpacity
             onPress={() => {
                 if (this.state.iconName === 'new') {
                    SearchPageModel.getInstance().searchType = 'articles';
                    this.setState({ iconName: 'infinity' });
                 } else {
                     SearchPageModel.getInstance().searchType = 'headlines';
                     this.setState({ iconName: 'new' });
                 } 
             }}
            >
                <Icon name={this.state.iconName} size={moderateScale(40)} />
            </TouchableOpacity>
        );
    }
}

export default StateButton;