import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import { useAxiosPublic } from "../hooks/useAxiosPublic";


export const authContext = createContext()
const auth = getAuth(app)
const provider = new GoogleAuthProvider();



const Auth = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const axiosPublic = useAxiosPublic()


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
    
      setUser(currentUser)
      // set token
      if (currentUser) {
        
        const userInfo = { email: currentUser.email }
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token)
              setLoading(false)
            }

          })
      }
 

      // removed token

      else {

        localStorage.removeItem('access-token')
        setLoading(false)

      }

      
    })

   

    return () => {
      unSubscribe()
    }

  }, [axiosPublic])

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  const createUserWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, provider)
  }

  const updatedUser = (name,photo) => {
    setLoading(false)
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
      
    })
  }


  const authInfo = {
    user,
    loading,
    createUser,
    createUserWithGoogle,
    login,
    logOut,
    updatedUser
  }
  return (
    <authContext.Provider value={authInfo}>
      {children}
    </authContext.Provider>
  );
};

export default Auth;