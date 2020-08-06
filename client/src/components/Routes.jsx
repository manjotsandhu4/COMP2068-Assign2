import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Login from './sessions/Login';
import Visits from './visits/Index';
import NewVisit from './visits/New';


function Routes({user, setUser}){
    return(
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/login" render={
                renderProps => <Login
                {...renderProps}
                setUser={setUser}
                />
            }/>  
            <Route exact path="/visits" render={
                renderProps => <Visits
                {...renderProps}
                user={user}
                />
            }/>
            <Route exact path="/visits/new" component={NewVisit}/>
        </Switch>
    );
}

export default Routes;