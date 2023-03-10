
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthForm from './Auth/AuthForm';
import Dashboard from './Auth/Dashboard';
import './App.css';
function App() {
  const { isAuthenticated } = useAuth(); // get the isAuthenticated value from the useAuth hook

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <AuthForm />
          </Route>
          <PrivateRoute exact path="/dashboard" isAuthenticated={isAuthenticated}>
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
