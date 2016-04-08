/**
 * Created by liu_k on 2016/4/8.
 * 用于测试的目的
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { Button,DatePicker } from 'antd';
import Animate from 'rc-animate';

class Box extends Component {

    render() {
        console.log('render', this.props.visible);
        const style = {
            display: this.props.visible ? 'block' : 'none',
            marginTop: '20px',
            width: '200px',
            height: '200px',
            backgroundColor: 'red'
        };
        return (<div style={style} ></div>);
    }

}
export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: 1};
    }

    toggleAnimate() {
        this.setState({
            visible: !this.state.visible
        });
    }

    static onAppear(key) {
        console.log('appear', key);
    }

    static onEnter(key) {
        console.log('enter', key);
    }

    static onLeave(key) {
        console.log('leave', key);
    }

    render() {

        return (
            <div>
                <button onClick={this.toggleAnimate.bind(this)}>toggle</button>
                <Animate
                    component=""
                    showProp="visible"
                    onAppear={Test.onAppear}
                    onEnter={Test.onEnter}
                    onLeave={Test.onLeave}
                    transitionAppear
                    transitionName="fade">
                    <Box visible={this.state.visible}/>
                </Animate>
            </div>
        )
    }
}


