/**
 * 可伸缩，自适应边栏
 *
 * 此边栏有两种显示模式
 *  iconMode    只显示图标
 *  normal      正常模式
 *
 * 另外还有个miniMode的显示模式，用于处理此sidebar的显示宽度，当屏幕宽度太小，
 * 如手机等设备时，需要强制显示模式为正常模式，并100%屏幕宽度
 *
 *  此边栏有两种选择模式
 *  one         每次只允许展开一个子菜单
 *  muti        允许展开多个子菜单
 *
 *  问题：
 *  当显示模式为iconMode的时候，如果采用muti的选择模式，会感觉有点奇怪（可模拟自行测试），目前未处理
 *
 *
 * Created by liu_kun on 2015/12/3.
 */
import React, { Component } from 'react';
import ReactDom from "react-dom"
import { connect } from 'react-redux'


import UserProfile from '../components/sidebar/UserProfile'

import  '../css/sidebar.scss'

class SideBar extends Component {


    /**
     * 缺省情况下，采用正常显示模式加上单选择模式
     */
    constructor() {
        super();


    }

    //state = {
    //
    //    /**
    //     * 当前被选中的大项
    //     */
    //    currentIndex: [],
    //    /**
    //     * 当前大项下被选中的具体子菜单
    //     */
    //    currentSubMenuItemIndex: -1,
    //    selectMode : 'one',//muti,one
    //};



    render() {
        const {profile} = this.props;

        return (

            <div>
                <UserProfile profile={profile}/>
            </div>

        );
    }
}

SideBar.propTypes = {};
SideBar.defaultProps = {};

function mapStateToProps(state, ownProps) {
    return {
        profile: state.profile,
    }
}

export default connect(mapStateToProps)(SideBar);
