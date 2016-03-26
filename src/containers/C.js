import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'

export default class C1 extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let header = {
            background: "greenyellow",
            //height: "100px"
        };

        let content = {
            background: "gray",
            //height: "100px"
        };

        const { children, url } = this.props;
        return (
            <div>
                <h1>c组件</h1>
                <hr />
                <div style={header}>
                    <Link to={`/c/c1`}>
                        前往c1
                    </Link>
                    <hr />
                    <Link to={`/c/c2`}>
                        前往c2
                    </Link>
                </div>



                <div style={content}> {children}</div>
            </div>
        )
    }
}
