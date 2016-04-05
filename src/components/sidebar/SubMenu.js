/**
 * Created by liu_k on 2016/4/5.
 */
import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router'

class SubMenu extends Component {


    /**
     * 生成菜单的一个子项
     * @param m 菜单数据
     */
    buildSubMenuItem(subMenuItem, index) {
        const {componentUrl,showMode} = this.props;

        let liClassName = "";
        if( componentUrl.substring(1) == subMenuItem.component ){
            liClassName += ' subItemActive';
        }
        return <li key={index} className={liClassName}>
            <Link to={subMenuItem.component? '/'+subMenuItem.component : '/'}>
                <span>
                    {subMenuItem.text}
                </span>
            </Link>

        </li>
    }

    render() {
        const {subMenuData,componentUrl,showMode} = this.props;

        let subMenu = subMenuData.map((item, index) => {
            return this.buildSubMenuItem(item, index);

        });
        return (
            <span>
                <ul>
                    {subMenu}
                </ul>
            </span>
        )
    }
}

SubMenu.propTypes = {};
SubMenu.defaultProps = {};

export default SubMenu