/**
 * 整个SAP程序的实际入口
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Header from './Header';
import SideBar from './SideBar';
import {MINI,NORMAL} from '../actions/SideBar';
import * as screenActions from '../actions/Screen';

import 'antd/lib/index.css';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('resize', this._resize_mixin_callback.bind(this));
        this._resize_mixin_callback();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resize_mixin_callback.bind(this));
    }

    /**
     * 实时告知各组件，当前屏幕的宽度
     * 出于性能考虑,只有当前的状态和之前的状态不一样,才重新设置模式,但是这样一来,高度就有可能并不是准确的了
     *
     * 先考虑性能吧,高度等有需要的时候再处理
     *
     * @private
     */
    _resize_mixin_callback() {
        let width = document.documentElement.clientWidth;
        let height = document.documentElement.clientHeight;
        const isBigScreen = width > 768;

        const {changeScreenSize,screen} = this.props;
        if (isBigScreen != screen.isBigScreen) {
            changeScreenSize(width, height);
        }
    }
    render() {
        const { children,componentUrl,screen,sideBar } = this.props;
        let contentStyle = {};
        if (screen.isBigScreen) {
            let marginLeft = 260;
            if (sideBar && sideBar.showMode == MINI) {
                marginLeft = 59;
            }
            contentStyle = {marginLeft: marginLeft, paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px'}
        } else {
            contentStyle = {float: 'left', width: '100%', paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px'}
        }
        return (
            <div style={{height:'100%'}}>
                <Header />
                <div style={{float:'left',height:'100%' }}>
                    <SideBar componentUrl={componentUrl}/>
                </div>
                <div id='content' style={contentStyle}>{children}</div>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.node,
    componentUrl: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {

    return {
        screen: state.screen,
        sideBar: state.sideBar,
        componentUrl: ownProps.location.pathname//当前所使用组件的url,
    }
}

export default connect(mapStateToProps, screenActions)(App)
