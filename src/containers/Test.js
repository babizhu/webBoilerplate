/**
 * Created by liu_k on 2016/4/8.
 * 用于测试的目的
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { Button,QueueAnim,Upload,Icon } from 'antd';
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
        return (<div style={style}></div>);
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

    click() {
        alert('test');
    }

    render() {

        const props = {
            name: 'file',
            showUploadList: false,
            action: 'http://localhost:8080/api/hadoop/upload'
        };

        return (

            <div>
                <QueueAnim>
                    <div key="b">
                        <QueueAnim component="ul">
                            <li key="0">11111111</li>
                            <li key="1">2222222222</li>
                            <li key="2">3333333333</li>
                        </QueueAnim>
                    </div>
                    <div>
                        <QueueAnim delay={200}>
                            <div key="title3"></div>
                            <QueueAnim component="ul"
                                       animConfig={{ opacity: [1, 0], translateY: [0, 30], scale: [1, 0.9] }} key="ul">
                                <li key="0">444444444444</li>
                                <li key="1">55555555555555</li>
                                <li key="2">66666666666</li>
                            </QueueAnim>
                            <div style={{background:'lightblue'}}>
                                <div style={{background:'lightgreen',width:'80%'}}>left</div>
                                <div style={{background:'lightpink', float:'right' ,position:''}}><span onClick={this.click.bind(this)}>right</span></div>
                            </div>
                        </QueueAnim>
                    </div>
                    <div>
                        <button onClick={this.toggleAnimate.bind(this)}>toggle</button>
                        <Animate
                            component=""
                            showProp="visible"
                            onAppear={this.onAppear}
                            onEnter={this.onEnter}
                            onLeave={this.onLeave}
                            transitionAppear
                            transitionName="fade">
                            <Box visible={this.state.visible}/>
                        </Animate>
                    </div>


                </QueueAnim>


                <Upload {...props}>
                    <Button type="ghost">
                        <Icon type="upload" /> 点击上传
                    </Button>
                </Upload>
            </div>


        )
    }
}


