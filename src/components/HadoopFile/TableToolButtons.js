/**
 * Created by liu_k on 2016/4/20.
 */
import React, { Component,PropTypes } from 'react';
import { Icon,Tooltip,Button,Upload,Modal  } from 'antd';


import {ignoreClick} from '../../utils/index';
import {BASE_URI,HADOOP_UPLOAD_URI} from '../../conf/config';

class TableToolButtons extends Component {
    constructor() {
        super();
        this.currentSelectIndex = -1;
        this.state = {
            showUpload: false
        };

    }

    onRenameClick(record, e) {
        ignoreClick(e);
        alert(record.pathSuffix);
        //if (e && e.stopPropagation) {
        //    e.stopPropagation();
        //    e.preventDefault();
        //
        //} else {
        //    // 否则，我们需要使用IE的方式来取消事件冒泡
        //    window.event.cancelBubble = true;
        //}

    }


    delDirectoryOk( record, recursiveDel, e ){
        const {operation,fileSystemData,openModal} = this.props;
        if( recursiveDel ){

        alert('要删除的文件是:' + fileSystemData.currentPath+ record.pathSuffix);
        }else {
            openModal(2);
        }
    }
    render() {

        const {record,operationData,fileSystemData} = this.props;

        return (
            <div onClick={(e)=>ignoreClick(e)}>


            <span className='actions'>
                <Tooltip title="重命名">
                    <Button type="ghost" className='button' onClick={this.onRenameClick.bind(this,record)}>
                        <Icon type="edit"/>
                    </Button>
                </Tooltip>

                <Tooltip title="删除">
                    <Button type="ghost" className='button'
                            onClick={this.delDirectoryOk.bind(this,record,null)}>
                        <Icon type="delete"/>
                    </Button>
                </Tooltip>

            </span>


            </div>

        );
    }
}

TableToolButtons.propTypes = {
    record: PropTypes.object,//当前记录
    fileSystemData: PropTypes.shape({
        pending: PropTypes.bool.isRequired,
        currentPath: PropTypes.string.isRequired,//当前路径
        currentPathIsFile: PropTypes.bool.isRequired,//当前路径是否文件
        data: PropTypes.object//当前路径下的内容，有可能是文件夹的数据，也有可能是具体某个文件的数据
    }).isRequired

};
TableToolButtons.defaultProps = {};

export default TableToolButtons;
