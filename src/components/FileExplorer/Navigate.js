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

    changePathClick(path) {
        const {showFileList} = this.props;
        showFileList(path);
    }

    onEditPathClick() {
        this.setState({isEdit: !this.state.isEdit})
    }

    buildPath(currentPath) {
        let result;
        let tempPath = '/';
        const pathArr = currentPath.substring(1).split('/');
        result = pathArr.map((item, index)=> {
                if (item.length !== 0) {
                    const pathName = item.length === 0 ? '/' : item;
                    tempPath += item + '/';
                    return <span onClick={this.changePathClick.bind(this,tempPath.substring(0,tempPath.length-1))}
                                 className='navigate' key={index}>{pathName} / </span>
                }
            }
        );
        return (
            <span>
                {result}
            </span>);
    }

    buildTextBox() {
        const {currentPath} = this.props.fileList;
        return (
            <input defaultValue={currentPath} style={{color:'black'}}/>
        )

    }

    render() {

        const {currentPath} = this.props.fileList;
        return (

            <div className='navigate-header'>
                <span className='canClick' onClick={this.onEditPathClick.bind(this)} style={{float:'right'}}>
                    编辑 <Icon type='edit'/>
                </span>

                <span onClick={this.changePathClick.bind(this,'/')} className='canClick' key='/'>
                     <span><Icon type='hdd' className='root'/>hadoop: / </span>
                </span>
                {this.state.isEdit ? this.buildTextBox() : this.buildPath(currentPath)}
            </div>


        );
    }
}


Navigate.propTypes = {
    fileList: PropTypes.object.isRequired

};
Navigate
    .defaultProps = {};

export
default
Navigate;