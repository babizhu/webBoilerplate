import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'ReactDOM';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
/**
 * 程序的实际入口
 */


class App extends Component {
    constructor(props) {
        super(props)

    }

    handleDismissClick() {
        //alert('handleDismissClick');
        const node = findDOMNode(this.refs.input);
        const text = node.value.trim();
        node.value = '';
        browserHistory.push(text)
    }

    render() {

        const { children, url,name,dispatch } = this.props;
        return (
            <div>

                <button onClick={this.handleDismissClick.bind(this)}>手动跳转</button><input type='text' ref='input' />
                <h1>导航</h1>
                当前url: {url}<br />
                当前查询:{name}
                <hr />
                <Link to={`/c`}>
                    前往c
                </Link>
                {children}
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.node
};

function mapStateToProps(state, ownProps) {
    return {
        state: state,
        url: ownProps.location.pathname.substring(1),
        name: ownProps.location.query.name
    }
}

export default connect(mapStateToProps)(App)
