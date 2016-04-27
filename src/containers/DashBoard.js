import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { QueueAnim,Button,DatePicker,Table } from 'antd';
import {AnimContainer} from './AnimContainer'


class DashBoard extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return(
            <h1>DashBoard</h1>
        )
    }
}


export default AnimContainer(DashBoard);