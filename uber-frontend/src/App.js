import '@patternfly/react-core/dist/styles/base.css';
import SimpleLoginPage from './components/SimpleLoginPage.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import React from 'react';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import Error from './components/Error';

function App() {
  return (
  <Router>
      <React.Fragment>
       <Switch>
		      
				  <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/" component={SimpleLoginPage}/>
          <Route path="/404" component={Error} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
          
	    </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
