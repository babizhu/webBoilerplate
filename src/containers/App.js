/**
 * 整个SAP程序的实际入口
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Header from './Header';
import SideBar from './SideBar';

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
     * 出于性能考虑,只有当前的状态和之前的状态不一样,才重新设置模式
     * @private
     */
    _resize_mixin_callback() {
        const {screen,changeScreenType} = this.props;
        let isBigScreen = document.documentElement.clientWidth > 768;

        if (isBigScreen != screen.isBigScreen) {
            changeScreenType(isBigScreen);

        }
    }

    render() {
        const { children,componentUrl } = this.props;
        return (
            <div>
                <Header />
                <div style={{float:'left'}}>
                    <SideBar componentUrl={componentUrl}/>
                </div>
                {children}
                <h1>Hello World</h1>

            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.node
};

function mapStateToProps(state, ownProps) {


    return {
        screen: state.screen,
        componentUrl: ownProps.location.pathname.substring(1)//当前所使用组件的url
    }
}

export default connect(mapStateToProps, screenActions)(App)
