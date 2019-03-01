import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { moderateScale } from 'react-native-size-matters';
import { inject, observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import SearchPageModel from '../ViewModels/SearchPageModel';

class GlobeButton extends Component {
    
    
    componentDidUpdate() {
        console.log('did update');
        console.log('text ' + this.text);
        if (this.text) {
            this.text.jello(1300);
        }
    }
    // handleTextRef = ref => this.text = ref;
    
    render() {
        return (
            <TouchableOpacity
             style={{ backgroundColor: 'orange', width: moderateScale(92), height: moderateScale(70), borderRadius: moderateScale(100) }}
             onPress={() => {
                const geo = SearchPageModel.getInstance().getLanguageCountry();
                if (geo === 'country') {
                    this.props.navigation.navigate('Country');
                } else {
                    this.props.navigation.navigate('Language');
                }
             }}
            >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Icon name='globe' size={moderateScale(23)} />
                    <Animatable.Text ref={(ref) => { this.text = ref; }} style={{ fontSize: moderateScale(12), width: moderateScale(52) }}>Specify {' ' + SearchPageModel.getInstance().getLanguageCountry()}</Animatable.Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default withNavigation(inject('searchPageModel')(observer(GlobeButton)));
