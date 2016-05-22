/**
 * Created by liukun on 16/5/22.
 */

import React, { Component } from 'react';
import './../../css/utils/pannel.scss';


class Pannel extends Component {
    render() {

        return (
            <div className='components-util-pannel'>
                <div className='bs-callout-warning  bs-callout '>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.content}</p>
                </div>
            </div>
        );
    }
}

Pannel.propTypes = {};
Pannel.defaultProps = {};

export default Pannel;
