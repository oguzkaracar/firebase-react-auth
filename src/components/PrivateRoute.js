import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// React Router ile Private Route mantığı bu şekilde...

const PrivateRoute = ({component: Component, ...rest}) => {

    const {currentUser} = useAuth();

    return (
        <Route {...rest} render={props => { // current user tanımlı değilse, login page'e redirect edicezz...!
            return currentUser ? <Component {...props}/> : <Redirect to="/login"/>
        }} />
            
        
    )
}

export default PrivateRoute
