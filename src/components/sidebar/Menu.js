/**
 * Created by liu_k on 2016/4/5.
 */
import React, { Component } from 'react';
import { Icon } from 'antd';
import SubMenu from './SubMenu';
import {MINI,NORMAL} from '../../actions/SideBar';

class Menu extends Component {

    menuClick(menuItem){
        menuItem.isOpen = !!!menuItem.isOpen;
        console.log( menuItem.text +'.isOpen = ' + menuItem.isOpen);//要用state来处理
    }
    /**
     * 生成箭头图标
     * @param iconMode
     * @param hasSubMenu
     * @param isSelected
     * @returns {string}
     */
    buildArrowIcon(showMode, hasSubMenu, isSelected) {
        let arrowIcon = '';
        if (showMode != MINI && hasSubMenu) {
            if (isSelected) {
                arrowIcon = 'down';
            } else {
                arrowIcon = 'right';
            }
        }

        let arrow = '';
        if (arrowIcon !== '') {
            arrow =
                <div className="arrow">
                    <Icon type={arrowIcon}/>
                </div>;
        }

        return arrow;


    }

    /**
     * 设置当前菜单是否为选中状态
     * 1、菜单本身的component和url相同，返回true
     * 2、菜单的任意子菜单的component和url相同，返回true
     * @param menuItem
     * @param componentUrl
     */
    isSelected(menuItem, componentUrl) {

        const url = componentUrl.substring(1);//去除掉url最前面的/
        if (url == menuItem.component) {
            return true;
        }
        if( menuItem.subMenu ) {
            for (const subMenu of menuItem.subMenu) {
                if (subMenu.component == url) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 生成菜单的一个子项
     * @param m 菜单数据
     */
    buildMenuItem(menuItem, index) {
        const {componentUrl,showMode} = this.props;
        let liClassName = "navigation-item";
        const isSelected = this.isSelected(menuItem, componentUrl);
        if (isSelected) {
            liClassName += ' active';
        }
        let hasSubMenu = menuItem.subMenu ? true : false;
        let subMenu;
        if (hasSubMenu && (isSelected || menuItem.isOpen)) {
            subMenu = <SubMenu subMenuData={menuItem.subMenu} showMode={showMode} componentUrl={componentUrl}/>
        }
        return <li className={liClassName} key={index} onClick = {this.menuClick.bind(this, menuItem)}>
            <Icon type={menuItem.icon}/>
                <span className={false ? 'miniMenu':''}>
                    {menuItem.text}
                </span>

            {this.buildArrowIcon(showMode, hasSubMenu, isSelected)}
            {subMenu}
        </li>
    }

    render() {
        const {menuData,componentUrl} = this.props;

        let menu = menuData.map((item, index) => {
            return this.buildMenuItem(item, index);

        });
        return (
            <span>
                <ul>
                    {menu}
                </ul>
            </span>
        )
    }
}

Menu.propTypes = {};
Menu.defaultProps = {};

export default Menu;