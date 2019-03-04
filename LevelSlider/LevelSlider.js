import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Circle from './Circle';

/**
 * require level declaration in bindingContext/ViewModel and setter method for level
 */

class LevelSlider extends Component {

    createCircles(levels) {
        const circles = [];
        for (let i = 0; i < levels; i++) {
            circles[i] = <Circle key={i} level={i} circleSize={this.props.circleSize} bindingContext={this.props.bindingContext} />;
        }
        return circles;
    }
    render() {
        return (
            <View style={{ width: this.props.width, justifyContent: 'center' }}>
                <View style={{ flex: 1, position: 'absolute', width: this.props.width, height: this.props.circleSize / 2, backgroundColor: 'black', borderRadius: 40 }} />
                <View style={{ flex: 1, zIndex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
                    {this.createCircles(this.props.levels)}
                </View>
            </View>
        );
    }

}

export default LevelSlider;
