import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'

export default class NotFound extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{background:'red'}}>
                <h1>文件没找到</h1>
                <Link to={`/`}>
                    返回主页
                </Link>
            </div>
        )
    }
}
