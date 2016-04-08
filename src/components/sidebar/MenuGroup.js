/**
 * Created by liu_k on 2016/4/5.
 * 最外层的菜单组
 * NORMAL:显示文字
 * MINI:显示一个'...'的图标
 *
 */

import React, { Component,PropTypes } from 'react';
import { Icon } from 'antd';

import {MINI,NORMAL} from '../../actions/SideBar';
import Menu from './Menu';
class MenuGroup extends Component {

    render() {

        const {menuGroup,componentUrl,changeOpenStatus,sideBar} = this.props;
        const showMode = sideBar.showMode;
        return (
            <span>
                <li className="navigation-header">
                    <span style={{display:showMode == NORMAL ? '':'none'}}>{menuGroup.text}</span>
                    <Icon type={menuGroup.icon} className='navigation-header-icon'
                          style={{display:showMode == MINI ? '':'none'}}/>
                </li>
                <Menu changeOpenStatus={changeOpenStatus}
                      menuData={menuGroup.menu} componentUrl={componentUrl}
                      sideBar={sideBar}/>
            </span>
        );
    }
}

MenuGroup.propTypes = {
    menuGroup:PropTypes.object.isRequired,//菜单数据
    componentUrl:PropTypes.string.isRequired,//url
    changeOpenStatus:PropTypes.func.isRequired,//函数用于设置菜单是否展开子菜单
    sideBar:PropTypes.object.isRequired//边栏相关的state
};
MenuGroup.defaultProps = {};

export default MenuGroup;