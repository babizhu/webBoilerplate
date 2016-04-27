/**
 * Created by liu_k on 2016/4/18.
 */
import React, { Component, PropTypes } from 'react'
import {QueueAnim} from 'antd'

export  const AnimContainer = (ComposedComponent) => class extends Component {
    //constructor() {
    //    this.state = { data: null };
    //}
    //componentDidMount() {
    //    this.setState({ data: 'Hello' });
    //}
    render() {
        return (
            <QueueAnim animConfig={{ translateX: [0, 800]}}>

                <div key='c'>
                    <ComposedComponent {...this.props} />
                </div>
            </QueueAnim>
        );

    }
}