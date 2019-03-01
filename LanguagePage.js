import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import LanguagePageModel from './ViewModels/LanguagePageModel';
import CheckList from './CheckList';
import { inject, observer } from 'mobx-react';
import ResponsiveImage from 'react-native-responsive-image';

class LanguagePage extends Component {
    static navigationOptions = {
        title: 'Language'
    }
    render() {
        return (
            <View style={{ borderBottomColor: 'blue', height: '100%' }}>
                <CheckList
                data={this.props.languagePageModel.getLanguages}
                bindingContext={LanguagePageModel.getInstance()}
                />
                <View style={{ position: 'absolute', left: '35%', backgroundColor: '#e5e5e5' }}>
                    
                    <Image source={require('./language.jpg')} width={600} height={1200} />
                    <Image source={require('./language.jpg')} width={600} height={1200} />  
                </View>
            </View>
        );
    }
}

/*
<Image source={require('./text.jpg')} width={600} height={1200} />
*/

export default inject('languagePageModel')(observer(LanguagePage));
