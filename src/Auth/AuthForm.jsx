import React, { useState, useEffect } from 'react';
import { AppProvider, Button, AlphaCard, Form, FormLayout, TextField } from '@shopify/polaris';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useHistory, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import './Authform.css';

const firebaseConfig = {
  apiKey: "AIzaSyAKNd8MkSaFvlbCJ90lf8AE2nnEO8h1dSY",
  authDomain: "polaris-shopify.firebaseapp.com",
  projectId: "polaris-shopify",
  storageBucket: "polaris-shopify.appspot.com",
  messagingSenderId: "380340910572",
  appId: "1:380340910572:web:4afd14eb84743baf06e8c9",
  measurementId: "G-BRHD9RT3D4"
};


firebase.initializeApp(firebaseConfig);

function AuthForm() {
  const history = useHistory();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const location = useLocation(); // add useLocation hook
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
 // add a new state to track login status
 useEffect(() => {
  if (isLoggedIn) {
    if (location.pathname !== '/dashboard') {
      history.push('/dashboard');
    }
  }
}, [isLoggedIn, location.pathname, history]);



  const handleFormChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  const [errorMessage, setErrorMessage] = useState(null);

const handleFormSubmit = (event) => {
  event.preventDefault();

  if (isLoginForm) {
    firebase
      .auth()
      .signInWithEmailAndPassword(formState.email, formState.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`User logged in: ${user.email}`);
        setIsLoggedIn(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('lastLocation', location.pathname); // store last location in local storage
        history.push('/dashboard');
      })
      .catch((error) => {
        console.error(`Error logging in user: ${error}`);
        setErrorMessage('Invalid email or password. Please try again.')
      });
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(formState.email, formState.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`User registered: ${user.email}`);
        setIsLoggedIn(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('lastLocation', location.pathname);
        history.push('/');
      })
      .catch((error) => {
        console.error(`Error registering user: ${error}`);
      });
  }
};

  return (
    <AppProvider>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <AlphaCard sectioned>
          <Form onSubmit={handleFormSubmit}>
            <FormLayout >
              <TextField
              className="Polaris-FormLayout__Item"
                label="Email"
                type="email"
                value={formState.email}
                onChange={(value) => handleFormChange('email', value)}

              />
              <TextField
                label="Password"
                type="password"
                value={formState.password}
                onChange={(value) => handleFormChange('password', value)}

              />
              {!isLoginForm && (
                <TextField
                  label="Name"
                  type="text"
                  value={formState.name}
                  onChange={(value) => handleFormChange('name', value)}

                />
              )}
              {!isLoginForm && (
                <TextField
                  label="Phone Number"
                  type="tel"
                  value={formState.phoneNumber}
                  onChange={(value) => handleFormChange('phoneNumber', value)}

                />
              )}
              <Button primary submit>
                {isLoginForm ? 'Log In' : 'Register'}
              </Button>
              <Button plain onClick={() => setIsLoginForm(!isLoginForm)}>
                {isLoginForm
                  ? 'Create an account'
                  : 'Log in to an existing account'}

              </Button>
            </FormLayout>
          </Form>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </AlphaCard>
      )}
    </AppProvider>
  );
}

export default AuthForm;