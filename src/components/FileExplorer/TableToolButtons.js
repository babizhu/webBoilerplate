/**
 * Created by liu_k on 2016/4/20.
 */
import React, { Component,PropTypes } from 'react';
import { Icon } from 'antd';

import {ignoreClick} from '../../utils/index'
class TableToolButtons extends Component {


    onRenameClick(e){
        const {record} = this.props;
        alert(record.pathSuffix);
        //if (e && e.stopPropagation) {
        //    e.stopPropagation();
        //    e.preventDefault();
        //
        //} else {
        //    // 否则，我们需要使用IE的方式来取消事件冒泡
        //    window.event.cancelBubble = true;
        //}
        ignoreClick(e);
    }
    render() {
        const {record} = this.props;
        return (
            <span>
                        <span onClick={this.onRenameClick.bind(this)}>操作一{record.permission}</span>
                        <span className="ant-divider"></span>
                        <a href="#">操作二</a>
                        <span className="ant-divider"></span>
                        <a href="#" className="ant-dropdown-link">
                            更多 <Icon type="down"/>
                        </a>
                    </span>
        );
    }
}

TableToolButtons.propTypes = {
    record: PropTypes.object,//当前记录
    filesData: PropTypes.shape({
        pending:PropTypes.bool.isRequired,
        currentPath:PropTypes.string.isRequired,//当前路径
        currentPathIsFile: PropTypes.bool.isRequired,//当前路径是否文件
        data: PropTypes.object//当前路径下的内容，有可能是文件夹的数据，也有可能是具体某个文件的数据
    }).isRequired,

    /**
     * 根据当前路径从服务器端获取数据，有可能获取的是文件夹的数据，也有可能是具体某个文件的数据
     */
    //getFilesData: PropTypes.func.isRequired
};
TableToolButtons.defaultProps = {};

export default TableToolButtons;