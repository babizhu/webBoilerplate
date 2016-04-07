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
import {MINI,NORMAL} from '../actions/SideBar';

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
        let widthValue, isShow;
        if (screen.isBigScreen) {
            widthValue = '260px';
            if (sideBar.showMode == MINI) {//大屏幕下的mini模式，也就是仅显示菜单图标
                widthValue = 'auto';
            }
        } else {
            widthValue = '100%';
            if (sideBar.showMode == MINI) {
                isShow = 'none';
            } else {
                isShow = 'block';
            }
        }
        return (

            <div className="sidebar" style={{width:widthValue,display:isShow}}>
                <div className="sidebar-content">
                    <UserProfile profile={profile} screen={screen} sideBar={sideBar}/>
                    <div className="sidebar-category">
                        <div className="category-content no-padding">
                            <ul className="navigation-ul">
                                {menu.map((menuGroup, index) => {

                                    if (menuGroup.show) {
                                        return <MenuGroup group={menuGroup} key={index}
                                                          componentUrl={componentUrl}
                                                          changeOpenStatus={changeOpenStatus}
                                                          sideBar={sideBar}
                                        />
                                    }
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

SideBar.propTypes = {};
SideBar.defaultProps = {};


/**
 * 生成客户有权限访问的相关菜单
 * @param profile   用户的权限信息
 */
function buildMenu(profile) {
    let resultMenu = initMenuData;
    if (profile.components == 'all') {
        setAllMenuShow(resultMenu);
        return resultMenu;
    }
    const components = profile.components;
    for (const m of components.split(",")) {
        for (const menuGroup of resultMenu) {
            buildMenuGroup(m, menuGroup);
        }
    }
    printMenu(resultMenu);
    return resultMenu;
}

function dosome(menuData, func) {
    for (const menuData of menu) {
        func(menuData);
        for (const menu of menuData.menu) {
            func(menu);
            if (menu.subMenu) {
                for (const sub of menu.subMenu) {
                    func(sub);
                }
            }
        }
    }
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
/**
 * 设置所有的菜单的show都为true，方便为菜单权限为‘all’的用户设置菜单
 * @param menu
 */
function setAllMenuShow(menu) {
    for (const menuGroup of menu) {
        menuGroup.show = true;
        for (const menu of menuGroup.menu) {
            menu.show = true;
            if (menu.subMenu) {
                for (const sub of menu.subMenu) {
                    sub.show = true;
                }
            }
        }
    }
}

function buildMenuGroup(component, menuGroup) {
    for (const menu of menuGroup.menu) {
        if (menu.component && menu.component === component) {
            menu.show = menuGroup.show = true;
        }
        if (menu.subMenu) {
            for (const sub of menu.subMenu) {
                if (sub.component == component) {
                    sub.show = menuGroup.show = menu.show = true;
                }
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

export default connect(mapStateToProps, sideBarActions)(SideBar);
