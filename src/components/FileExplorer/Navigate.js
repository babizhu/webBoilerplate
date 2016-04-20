/**
 * Created by liukun on 16/4/17.
 * hadoop文件浏览器的导航条
 */
import React, { Component,PropTypes } from 'react';
import { Form,Icon,Input } from 'antd';
class Navigate extends Component {
    constructor() {
        super();
        this.state = {isEdit: false};
    }

    componentDidUpdate() {
        //noinspection JSUnresolvedVariable
        const inputDom = this.refs.pathInput;
        if (inputDom) {
            inputDom.focus();
            inputDom.select();
        }
    }

    ignoreClick(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();

        } else {
            // 否则，我们需要使用IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
        }
    }

    pathClick(path, e) {
        const {getFilesData} = this.props;
        getFilesData(path);
        this.ignoreClick(e);
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
                const {showFileList} = this.props;
                showFileList(value);
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
                        <span className='fileName' onClick={this.ignoreClick.bind(this)} key="file">
                            {item}
                        </span>);
                } else {
                    if (item.length !== 0) {
                        tempPath += item + '/';
                        return (
                            <span onClick={this.pathClick.bind(this,tempPath)} className='canClick' key={index}>
                                <span style={{width:'15px'}}> </span>
                                {item}
                                <span style={{width:'15px'}}> / </span>
                            </span>
                        );
                    }
                }
            }
        );
    }

    /**
     * 构造路径编辑框
     * @returns {XML}
     */
    buildPathInput() {
        const {currentPath} = this.props.fileList;
        return (
            <input
                defaultValue={currentPath}
                style={{color:'black',width:'100%'}}
                onBlur={this.endEditPath.bind(this) }
                onKeyUp={this.endEditPath.bind(this) }
                onClick={this.ignoreClick.bind(this)}
                ref='pathInput'
            />
        )
    }

    render() {
        const {currentPath} = this.props.filesData;
        let content = this.state.isEdit ? this.buildPathInput() :
            <div onClick={this.beginEditPath.bind(this)}>
                <span onClick={this.pathClick.bind(this,'/')} className='canClick' key='/'>
                     <span><Icon type='hdd' className='root'/>hadoop: / </span>
                </span>
                {this.buildPath(currentPath)}
            </div>;
        return (
            <div className='navigate-header'>{content}</div>
        )


    }
}


Navigate.propTypes = {
    filesData: PropTypes.shape({
        pending:PropTypes.bool.isRequired,
        currentPath:PropTypes.string.isRequired,//当前路径
        currentPathIsFile: PropTypes.bool.isRequired,//当前路径是否文件
        data: PropTypes.object//当前路径下的内容，有可能是文件夹的数据，也有可能是具体某个文件的数据
    }).isRequired,

    /**
     * 根据当前路径从服务器端获取数据，有可能获取的是文件夹的数据，也有可能是具体某个文件的数据
     */
    getFilesData: PropTypes.func.isRequired

};
Navigate.defaultProps = {};

export default Navigate;