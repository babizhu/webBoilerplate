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
     * 高度让上面的优化似乎无法实现了,再想想
     * @private
     */
    _resize_mixin_callback() {
        const {screen,changeScreenSize} = this.props;
        let width = document.documentElement.clientWidth;
        let height = document.documentElement.clientHeight;


        //if (isBigScreen != screen.isBigScreen) {
        changeScreenSize(width, height);

        //}
    }

    render() {
        const { children,componentUrl,screen } = this.props;
        return (
            <div>
                <Header />
                <div style={{float:'left',height:screen.height }}>
                    <SideBar componentUrl={componentUrl}/>
                </div>
                <div style={{float:'left',padding:'10px'}}>{children}</div>


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
        componentUrl: ownProps.location.pathname//当前所使用组件的url,
    }
}

export default connect(mapStateToProps, screenActions)(App)
