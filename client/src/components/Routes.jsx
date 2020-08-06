import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './sessions/Login';
import Visits from './visits/Index';
import NewVisit from './visits/New';
import EditVisit from './visits/Edit';
import Logout from './sessions/Logout';


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
            <Route exact path="/logout" render={
                    renderProps => <Logout
                    {...renderProps}
                    setUser={setUser}
                    />
            }/>
            <Route exact path="/visits/edit" component={EditVisit}/>
            <Route exact path="/visits/new" component={NewVisit}/>
        </Switch>
    );
}

export default Routes;