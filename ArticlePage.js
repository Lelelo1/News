import React, { Component } from 'react';
import { Text, View, Image, Dimensions, ScrollView } from 'react-native';
import SearchPageModel from './ViewModels/SearchPageModel';
import { moderateScale, scale } from 'react-native-size-matters';
import AutoHeightImage from 'react-native-auto-height-image';

const screenWidth = Dimensions.get('screen').width;

class ArticlePage extends Component {
    static navigationOptions = {
        title: 'Article'
        // dela artikel och spara artikel
    }
    renderImage(urlToImage) {
        if (urlToImage) {
            return (
                <AutoHeightImage
                 source={{ uri: urlToImage }}
                 width={screenWidth}
                />
            );
        } else {
            // return default/standard image
            return null;
        }
    }
    render() {
        const article = SearchPageModel.getInstance().selectedArticle;
        return (
            <ScrollView>
                 <View style={{ flex: 1 }}>
                    {this.renderImage(article.urlToImage)}
                    <Text style={{ fontSize: moderateScale(25) }}>{article.title}</Text>
                    <Text style={{ fontSize: moderateScale(12) }}>{article.content}</Text>
                    <View style={{ flex: 1, alignSelf: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Text style={{ fontSize: moderateScale(10) }} >Source: {article.source.name}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default ArticlePage;
