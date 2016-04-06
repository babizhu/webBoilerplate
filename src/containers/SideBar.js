/**
 * Created by liu_kun on 2015/12/3.
 *
 * 可伸缩，自适应边栏
 *
 * 自身带有两者显示模式
 * NORMAL
 * MINI
 *
 *
 * 当state.screen.isBigScreen属性为true时
 * NORMAL:显示图标+文本
 * MINI:仅显示图标
 *
 * 当state.screen.isBigScreen属性为false时
 * NORMAL:显示图标+文本，并且充斥满整个屏幕宽度
 * MINI:不显示（隐藏）
 *
 *
 *  此边栏有两种选择模式
 *  one         每次只允许展开一个子菜单
 *  muti        允许展开多个子菜单
 *
 *  问题：
 *  当显示模式为ICON_ONLY的时候，如果采用muti的选择模式，会感觉有点奇怪（可模拟自行测试），目前未处理
 *
 */
import React, { Component } from 'react';
import ReactDom from "react-dom"
import { connect } from 'react-redux'

import UserProfile from '../components/sidebar/UserProfile'
import MenuGroup from '../components/sidebar/MenuGroup'
import {initMenuData} from '../const/MenuData.js';

import * as sideBarActions from '../actions/SideBar';
import  '../css/sidebar.scss'

class SideBar extends Component {


    /**
     * 缺省情况下，采用正常显示模式加上单选择模式
     */
    constructor() {
        super();


    }

    render() {
        const {profile,screen,sideBar,componentUrl,menu,changeOpenStatus} = this.props;

        const widthValue = '260px';
        //const showValue = 'block';
        return (

            <div className="sidebar" style={{width:widthValue}}>
                <div className="sidebar-content">
                    <UserProfile profile={profile} screen={screen} sideBar={sideBar}/>
                    <div className="sidebar-category">
                        <div className="category-content no-padding">
                            <ul className="navigation-ul">
                                {menu.map((x,index) => {

                                    return <MenuGroup group={x} key={index}
                                                      componentUrl={componentUrl} changeOpenStatus={changeOpenStatus}
                                                      sideBar={sideBar}
                                    />
                                })}


                            </ul>
                        </div>
                    </div>

                </div>
                当前组件Url：{componentUrl}
            </div>

        );
    }
}

SideBar.propTypes = {};
SideBar.defaultProps = {};

/**
 * 生成客户有权限访问的相关菜单
 * @param state
 */
function buildMenu(profile) {
    let resultMenu = initMenuData;

    const components = profile.components;

    for (const m of components.split(",")) {
        for (const menuData of resultMenu) {

            buildOneMenuData(m, menuData);

        }
    }

    //printMenu( resultMenu );
    return resultMenu;

}

/**
 * 打印菜单,调试用
 * @param menu
 */
function printMenu( menu ){
    for (const menuData of menu) {
        console.log(menuData.text + ' show = ' + menuData.show);
        for( const menu of menuData.menu ){
            console.log( '\t' + menu.text + ' component = '+ menu.component +' show = ' + menu.show);
            if( menu.subMenu) {
                for (const sub of menu.subMenu) {
                    console.log('\t\t' + sub.text + ' component = '+ sub.component +' show = ' + sub.show);

                }
            }
        }
    }
}
function buildOneMenuData(component, menuData) {
    //console.log( menuData.text);
    menuData.show = false;
    for( const menu of menuData.menu ){
        if( menu.component && menu.component === component ){
            menu.show = menuData.show = true;
        }else{
            menu.show = false;
        }
        //console.log('\tmy menu is ' + menu.text );

        if( menu.subMenu){
            for( const sub of menu.subMenu){
                if( sub.component == component ){
                    sub.show = menuData.show = menu.show = true;
                }else {
                    sub.show = false;
                }
                //console.log( '\t\tsubmenu is' + sub.text );
            }
        }
    }

}

function mapStateToProps(state) {

    return {
        profile: state.profile,
        screen: state.screen,
        sideBar: state.sideBar,
        menu: buildMenu(state.profile)

    }
}

export default connect(mapStateToProps,sideBarActions)(SideBar);
