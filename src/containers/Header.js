import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as profileActions from '../actions/Profile'
/**
 * Created by liu_k on 2016/3/29.
 * 整个页面最上面一层的信息的智能容器
 */
class Header extends Component {


    constructor(props) {
        super(props)
    }

    render() {
        const {profile} = this.props;

        //let a = {...profile,name:'abcd'};

        return (
            <div>
                名字:{profile.name}
            </div>
        )
    }
}

Header.propTypes = {};
Header.defaultProps = {};
function mapStateToProps(state, ownProps) {
    return {
        profile: state.profile,

    }
}

export default connect(mapStateToProps,profileActions)(Header)



