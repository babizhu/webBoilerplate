/**
 * Created by liu_k on 2016/4/20.
 * 显示具体文件内容的视图
 */

import React, { Component,PropTypes } from 'react';
import { Icon,Table } from 'antd';

import {formatFileSize} from '../../utils/index';
import {formatTime} from '../../utils/time';

class FileView extends Component {

    constructor(){
        super();
        //this.state={readAsText:true};
        this.readAsText = true;
    }

    changeFileViewMode(){
        const {getFilesData} = this.props;
        const {currentPath} = this.props.filesData;
        //this.setState({readAsText:!this.state.readAsText});
        this.readAsText = !this.readAsText;
        getFilesData(currentPath ,this.readAsText);
    }


    displayFileContent(res){
        if( res && res.fileContent.content){
            if( this.readAsText ){
                return <pre>{res.fileContent.content}</pre>
            }else{
                let str = res.fileContent.content;
                let index = 1;
                let result = '';
                for( let c of [...str]){
                    result += c;
                    if( index != 0 && index % 2 == 0){
                        result += ' ';
                    }

                    index++;
                }
                return <div style={{fontFamily:'courier new, monospace'}}>{result}</div>;
            }
        }
    }
    /**
     * 让16进制文件更加方便阅读
     * @param str
     */
    formatHexString(str){

    }
    //{this.state.readAsText?'以二进制格式查看':'以文本方式查看'}
    render() {
        const {filesData} = this.props;
        const {fileStatus} = this.props.filesData.data;
        return (
            <div  className='fileView'>
                <div className='fileStatus'>
                    <div className='infoHeader'>查看方式</div>
                    <div className='content'>
                        <div className='value' onClick={this.changeFileViewMode.bind(this)}>
                            <Icon type="edit"/>
                            {this.readAsText?'以二进制格式查看':'以文本方式查看'}
                        </div>
                    </div>
                    <div className='infoHeader'>信息</div>
                    <div className='content'>
                        <div className='name'>文件名</div>
                        <div  className='value'>{fileStatus.pathSuffix}</div>
                        <div className='name'>大小</div>
                        <div  className='value'>{formatFileSize(fileStatus.length)}</div>
                        <div className='name'>创建时间</div>
                        <div  className='value'>{formatTime(formatTime(fileStatus.modificationTime))}</div>
                        <div className='name'>用户</div>
                        <div  className='value'>{fileStatus.owner}</div>
                        <div className='name'>组</div>
                        <div  className='value'>{fileStatus.group}</div>
                        <div className='name'>复制块</div>
                        <div  className='value'>{fileStatus.replication}</div>
                        <div className='name'>块大小</div>
                        <div  className='value'>{formatFileSize(fileStatus.blockSize)}</div>
                    </div>
                </div>
                <div className='fileContent' style={{wordBreak:'keep-all'}}>

                        {this.displayFileContent(filesData.data) }

                </div>
            </div>
        )
    }
}
FileView.propTypes = {
    filesData: PropTypes.shape({
        pending: PropTypes.bool.isRequired,
        currentPath: PropTypes.string.isRequired,//当前路径
        data: PropTypes.object//当前文件的数据
    }).isRequired,

    /**
     * 根据当前路径从服务器端获取数据，有可能获取的是文件夹的数据，也有可能是具体某个文件的数据
     */
    getFilesData: PropTypes.func.isRequired
};
FileView.defaultProps = {};

export default FileView;