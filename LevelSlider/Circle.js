import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import SearchPageModel from '../ViewModels/SearchPageModel';

class Circle extends Component {
    /*
    static getDerivedStateFromProps(props, state) {
        const newState = state;
        newState.style = this.changeStyle();
        return newState;
    }
    */
    style() {
        const style = { width: this.props.circleSize, height: this.props.circleSize, borderRadius: this.props.circleSize / 2, borderWidth: this.props.circleSize / 10, borderColor: 'black', backgroundColor: 'white' }
        if (this.props.bindingContext.level === this.props.level) {
            style.backgroundColor = 'black';
        } else {
            style.backgroundColor = 'white';
        }
        return style;
    }
    render() {
        return (
            <TouchableOpacity
             style={this.style()}
             onPress={() => {
                 console.log('selected level: ' + this.props.level); 
                 // this.setState({ style: this.changeStyle() });
                 this.props.bindingContext.setLevel(this.props.level);
             }}
            />
        );
    }
    
}


export default (observer(Circle));
