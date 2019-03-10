import React, { Component } from 'react';
import { Switch } from 'react-native';
import { ListItem, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { observer, Observer } from 'mobx-react';
import { observable, intercept, IInterceptor, observe, decorate, action } from 'mobx';

class CheckListItem extends Component {
    
    static getDerivedStateFromProps(props, state) {
        return { color: props.isSelected ? '#dddddd' : '#fff', icon: props.isSelected ? { name: 'check', size: 33 } : null };
    }
    
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.isSelected ? '#dddddd' : '#fff',
            icon: this.props.isSelected ? { name: 'check', size: 33 } : null,
            name: this.props.title
        };
    }    

    render() { 
        console.log('child rendered: ' + this.props.isSelected);
        return (
            <ListItem
                leftAvatar={this.props.leftAvatar}
                title={this.props.title}
                // subtitle={this.props.subtitle}
                leftIcon={this.state.icon}
                onPress={(event) => {
                    this.props.onSelect();
                    console.log('pressed: ' + this.state.name);
                }}
                containerStyle={{ backgroundColor: this.state.color }}
            />
        );
    }
}
// switch={{ value: this.state.isChecked, disabled: true }}
export default CheckListItem;
