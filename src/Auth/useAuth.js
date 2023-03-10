import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated', 'true'); // store login state in local storage
            } else {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('isAuthenticated'); // remove login state from local storage
            }
        });

        return unsubscribe;
    }, []);

    return { user, isAuthenticated };
};


export { useAuth };