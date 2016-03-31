/**
 * Created by liu_k on 2016/3/31.


 * 整个应用的header条中的下拉菜单
 */
import React, { Component,PropTypes } from 'react';
import ReactDom from "react-dom"

import '../../css/components/header/dropDownMenu.scss'

export default class UserProfile extends Component {


    render() {

        const {profile} = this.props
        return (

            <div>
                mingzi{profile.name}
            </div>
        )
    }
}


UserProfile.propTypes = {
    profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon:PropTypes.string
    }).isRequired,
};
UserProfile.defaultProps = {};

