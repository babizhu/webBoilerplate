/**
 * Created by liu_k on 2016/4/5.
 */
import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router'

class SubMenu extends Component {

    click(item, e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();

        } else {
            // 否则，我们需要使用IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
        }

    }

    /**
     * 生成菜单的一个子项
     * @param subMenuItem 菜单数据
     */
    buildSubMenuItem(subMenuItem, index) {
        const {componentUrl,showMode} = this.props;

        let liClassName = "";
        if (componentUrl.substring(1) == subMenuItem.component) {
            liClassName += ' subItemActive';
        }
        return(
        <li key={index} className={liClassName} onClick={this.click.bind(this,subMenuItem) }>
            <Link to={subMenuItem.component? '/'+subMenuItem.component : '/'} key={index}>
                <div>
                    {subMenuItem.text}
                </div>

            </Link>
        </li>
        );

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