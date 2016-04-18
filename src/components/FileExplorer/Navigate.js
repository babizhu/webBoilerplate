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

    componentDidUpdate(prevProps, prevState) {
        const input = this.refs.pathInput;
        if (input) {
            //const dom = findDOMNode(input);
            const dom = input.getDOMNode();
            dom.focus();
            dom.select();
            //var rtextRange =findDOMNode(input).createTextRange();
            //rtextRange.moveStart('character',findDOMNode(input).value.length);
            //rtextRange.collapse(true);
            //rtextRange.select();
        }
    }

    pathClick(path) {
        const {showFileList} = this.props;
        showFileList(path);
    }

    beginEditPath() {
        this.setState({isEdit: !this.state.isEdit});
    }

    /**
     *
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
        let result;
        let tempPath = '/';
        const pathArr = currentPath.substring(1).split('/');
        result = pathArr.map((item, index)=> {
                if (item.length !== 0) {
                    const pathName = item.length === 0 ? '/' : item;
                    tempPath += item + '/';
                    return ( <span onClick={this.pathClick.bind(this,tempPath.substring(0,tempPath.length-1))}
                                   className='canClick' key={index}>
                                {pathName} /
                            </span>
                    );
                }
            }
        );
        return (
            <span>
                {result}
            </span>);
    }

    buildPathInput() {
        const {currentPath} = this.props.fileList;
        return (
            <input
                defaultValue={currentPath}
                style={{color:'black',width:'60%'}}
                onBlur={this.endEditPath.bind(this) }
                onKeyUp={this.endEditPath.bind(this) }
                ref='pathInput'
            />
        )
    }

    render() {

        const {currentPath} = this.props.fileList;
        return (
            <div className='navigate-header'>
                <span className='canClick' onClick={this.beginEditPath.bind(this)} style={{float:'right'}}>
                    编辑 <Icon type='edit'/>
                </span>

                <span onClick={this.pathClick.bind(this,'/')} className='canClick' key='/'>
                     <span><Icon type='hdd' className='root'/>hadoop: / </span>
                </span>
                {this.state.isEdit ? this.buildPathInput() : this.buildPath(currentPath)}
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