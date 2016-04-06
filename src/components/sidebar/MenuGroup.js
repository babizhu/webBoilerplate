/**
 * Created by liu_k on 2016/4/5.
 * 最外层的菜单组
 * NORMAL:显示文字
 * MINI:显示一个。。。的图标
 *
 */

import React, { Component } from 'react';
import { Icon } from 'antd';

import {MINI,NORMAL} from '../../actions/SideBar';
import Menu from './Menu';
class MenuGroup extends Component {

    render() {

        const {group,componentUrl,changeOpenStatus,sideBar} = this.props;
        const showMode = sideBar.showMode;
        return (
            <span>
                <li className="navigation-header">
                    <span  style={{display:showMode == NORMAL ? '':'none'}}>{group.text}</span>
                    <Icon type={group.icon} className='navigation-header-icon' style={{display:showMode == MINI ? '':'none'}}/>
                </li>
                <Menu changeOpenStatus={changeOpenStatus} menuData={group.menu} showMode={showMode} componentUrl={componentUrl} openMenu={sideBar.openMenu}/>
            </span>
        );
    }
}

MenuGroup.propTypes = {};
MenuGroup.defaultProps = {};

export default MenuGroup;