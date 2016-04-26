/**
 * Created by liukun on 16/4/17.
 * hadoop文件浏览器的导航条
 */
import React, { Component,PropTypes } from 'react';
import { Form,Icon,Input,Tooltip,message } from 'antd';

import UploadModal from './UploadModal'
import {ignoreClick} from '../../utils/index'
import {BASE_URI,UPLOAD_URI} from '../../conf/config'

import {showErrMsg} from '../../actions/App';

class Navigate extends Component {
    constructor() {
        super();
        this.state = {
            isEdit: false,
            showUpload: false,
            fileList: []
        };
    }

    componentDidUpdate() {
        //noinspection JSUnresolvedVariable
        const inputDom = this.refs.pathInput;
        if (inputDom) {
            inputDom.focus();
            inputDom.select();
        }
    }


    pathClick(path, e) {
        const {getFilesData} = this.props;
        getFilesData(path);
        ignoreClick(e);
    }

    beginEditPath() {
        this.setState({isEdit: !this.state.isEdit});
    }

    /**
     * 完成路径输入框的编辑
     * 1 如果按esc或输入框失去焦点,直接退出输入框
     * 2 回车则提交用户输入的内容
     * @param event
     */
    endEditPath(event) {
        if (event.keyCode) {
            if (event.keyCode === 13) {
                let value = event.target.value;
                const {getFilesData} = this.props;
                getFilesData(value);
                this.setState({isEdit: false});
            } else if (event.keyCode == 27) {
                this.setState({isEdit: false});
            }

        } else {
            this.setState({isEdit: false})
        }
    }

    buildPath(currentPath) {
        //  /
        //  /input/badage
        //  /input/badage/log
        const isFile = !currentPath.endsWith('/');//路径如果以/结尾说明当前路径是目录
        if (currentPath === '/') {
            return;
        }

        const pathArr = currentPath.substring(1).split('/');

        let tempPath = '/';
        return pathArr.map((item, index)=> {
                if (index === pathArr.length - 1 && isFile) {
                    return (
                        <span className='fileName' onClick={(e)=>ignoreClick(e)} key="file">
                            {item}
                        </span>);
                } else {
                    if (item.length !== 0) {
                        tempPath += item + '/';
                        return (
                            <span key={index}>
                            <span onClick={this.pathClick.bind(this,tempPath)} className='canClick'>
                                <span style={{width:'15px'}}> </span>
                                {item}
                                </span>
                                <span style={{width:'15px'}}> / </span>
                                </span>

                        );
                    }
                }
            }
        );
    }

    /**
     * 返回上一层目录
     * @param currentPath   当前目录
     * @param e             e
     */
    back(currentPath, e) {
        ignoreClick(e);
        if (currentPath === '/') {
            //alert( '根目录了');
            return;
        }
        const {getFilesData} = this.props;
        let path = currentPath;

        if (currentPath.endsWith('/')) {
            path = currentPath.substring(0, currentPath.length - 1);
        }
        path = path.substring(0, path.lastIndexOf('/') + 1);
        //alert('path = ' + path);
        getFilesData(path);

    }

    /**
     * 构造路径编辑框
     * @returns {XML}
     */
    buildPathInput() {
        const {currentPath} = this.props.filesData;
        return (
            <input
                defaultValue={currentPath}
                style={{color:'black',width:'100%'}}
                onBlur={this.endEditPath.bind(this) }
                onKeyUp={this.endEditPath.bind(this) }
                onClick={(e)=>ignoreClick(e)}
                ref='pathInput'
            />
        )
    }

    onUploadClick(filesData, e) {
        ignoreClick(e);
        this.setState({showUpload: !this.state.showUpload});
        if( !filesData.currentPathIsFile ){
            const {getFilesData} = this.props;
            getFilesData(filesData.currentPath);
        }

    }

    handleChange(info) {
        let fileList = info.fileList;

        let errMsg = [];

        // 3. 按照服务器返回信息筛选成功上传的文件
        fileList = fileList.filter((file) => {
            if (file.status === 'done') {
                if (!file.changeDisplayName) {//显示的文件名只修改一次
                    if (file.response.error) {
                        file.name = <span>{file.name} <Icon style={{color:'red',marginTop:'5px'}}
                                                            type="cross-circle-o"/></span>;
                        //return false;不显示文件名
                    } else {
                        file.name = <span>{file.name} <Icon style={{color:'red',marginTop:'5px'}}
                                                            type="check-circle-o"/></span>;
                    }
                    file.changeDisplayName = true;
                }
            }
            return true;
        });

        //const {showErrMsg} = this.props;
        //for( let e in errMsg ){
        //    console.log( e )
        //    showErrMsg(e.errorId, e.args, UPLOAD_URI);//
        //}
        this.setState({fileList});

        const {showErrMsg} = this.props;
        if (info.file.status === 'done') {
            if (info.file.response.error) {
                const e = info.file.response.error;
                showErrMsg(e.errorId, e.args, UPLOAD_URI);//
                //message.error(`${e.args} 上传失败:目录下存在同名文件`);
            }
            else {

                //message.success(`${info.file.name} 上传成功。`);
            }
        }
    }

    render() {
        const {currentPath} = this.props.filesData;
        const uploadPorps = {

            onChange: this.handleChange.bind(this),
            data: {path: currentPath},
            name: 'file',
            //showUploadList: false,
            multiple: true,
            action: UPLOAD_URI
        };


        let content = this.state.isEdit ? this.buildPathInput() :
            <div onClick={this.beginEditPath.bind(this)}>
                <span onClick={this.pathClick.bind(this,'/')} className='canClick' key='/'>
                     <span><Icon type='hdd' className='root'/>hadoop</span>: /
                </span>
                {this.buildPath(currentPath)}
                <Tooltip title="返回上层目录">
                    <div className='canClick' style={{float:'right',marginLeft:'30px'}}
                         onClick={this.back.bind(this,currentPath)}>
                        <Icon type='rollback'/>
                    </div>
                </Tooltip>
                <Tooltip title="在当前目录中上传新文件">
                    <div className='canClick' style={{float:'right'}}
                         onClick={this.onUploadClick.bind(this,this.props.filesData)}>
                        <Icon type='upload'/>
                    </div>
                </Tooltip>
            </div>;
        return (
            <div>
                <UploadModal uploadPorps={uploadPorps}
                             uploadOk={this.onUploadClick.bind(this,this.props.filesData)}
                             visible={this.state.showUpload}
                             fileList={this.state.fileList}/>
                <div className='navigate-header'>{content}</div>
            </div>
        )
    }
}


Navigate
    .propTypes = {
    filesData: PropTypes.shape({
        pending: PropTypes.bool.isRequired,
        currentPath: PropTypes.string.isRequired,//当前路径
        currentPathIsFile: PropTypes.bool.isRequired,//当前路径是否文件
        data: PropTypes.object//当前路径下的内容，有可能是文件夹的数据，也有可能是具体某个文件的数据
    }).isRequired,

    /**
     * 根据当前路径从服务器端获取数据，有可能获取的是文件夹的数据，也有可能是具体某个文件的数据
     */
    getFilesData: PropTypes.func.isRequired

};
Navigate
    .defaultProps = {};

export
default
Navigate;