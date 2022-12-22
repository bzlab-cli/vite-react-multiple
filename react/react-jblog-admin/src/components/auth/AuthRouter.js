/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/5/28 17:28
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/5/28 17:28
 */

import React, {Component} from 'react'
import {withRouter, Route, Redirect} from 'react-router-dom'
import Cookeis from "js-cookie";

@withRouter
class AuthRouter extends Component {
    render() {
        const {component: Component, ...rest} = this.props;
        let cookie = Cookeis.get('token');

        return (
            <Route {...rest} render={props => {
                return cookie
                    ? <Component {...props} />
                    : <Redirect to="/login"/>
            }}/>
        )
    }
}

export default AuthRouter;
