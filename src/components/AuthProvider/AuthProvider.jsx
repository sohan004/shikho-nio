import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase.config';

export const AuthContex = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [load, setLoad] = useState(true)
    const auth = getAuth(app)

    const provider = new GoogleAuthProvider()

    const signUp = (email, pass) => {
        setLoad(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }
    const signIn = (email, pass) => {
        setLoad(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }
    const out = (email, pass) => {
        setLoad(true)
        return signOut(auth)
    }
    const google = () => {
        setLoad(true)
        return signInWithPopup(auth, provider)
    }
    const updt = (u, n, i) => {
        setLoad(true)
        return updateProfile(u, {
            displayName: n, photoURL: i
        })
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoad(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])
    const info = {
        user,
        load,
        signIn,
        signUp,
        updt,
        out,
        google,
    }
    return (
        <AuthContex.Provider value={info}>
            {children}
        </AuthContex.Provider>
    );
};

export default AuthProvider;