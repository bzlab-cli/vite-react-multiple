import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import AuthRouter from '../components/auth/AuthRouter';
import Login from '../views/login/login';
import Register from '../views/login/register';
import Index from '../views/layout';
import NotFound from '../views/404/notFound';

export default () => (
    <Router>
        <div style={{height: '100%'}}>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/article/list" push/>}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <AuthRouter path='/app' component={Index}></AuthRouter>
                <Route path='/404' component={NotFound}/>
                <Redirect from='*' to='/404'/>
            </Switch>
        </div>
    </Router>
)
