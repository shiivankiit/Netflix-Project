import Header from "./Header";
import { useState, useRef, useEffect,} from "react";
import { checkValidData } from "../utils/validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase";
import {useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const nameValue = name.current?.value;

    if(!emailValue){
      setErrorMessage("Please provide an email address.")
      return;
    }

    if(!passwordValue){
      setErrorMessage("Please provide a password.");
      return;
    }

    const message = checkValidData(emailValue, passwordValue, isSignInForm ? null : nameValue);
    setErrorMessage(message);
    if(message) return;
    //Basically this will create a user with firebase.
    //Sign In Sign Up Logic.
    if(!isSignInForm){
      //Sign up logic.
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName:name.current.value, 
          photoURL:USER_AVATAR
                })
        .then(() => {
          const {uid,email,displayName,photoURL}=auth.currentUser;
          dispatch(
            addUser({
              uid:uid,
              email:email,
              displayName:displayName,
              photoURL:photoURL,
            })
          );
        }).catch((error) => {
          // An error occurred the set error message here
          setErrorMessage(error.message);
          // ...
        });
      
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage)
        // ..
      });
    }
    else{
      //Sign In Logic.
  signInWithEmailAndPassword(
    auth,
    email.current.value, 
    password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"_"+errorMessage);
  });
    }

  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Disable body scroll when the form is displayed
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable body scroll when the component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <Header />
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full"
          src={BG_URL}
          alt="background"
        />
        <div className="bg-black opacity-50 absolute inset-0" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleButtonClick();
        }}
        className="fixed w-full max-w-md p-8 bg-black bg-opacity-80 rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
      >
        <h1 className="font-bold text-3xl py-4 text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 my-3 w-full bg-gray-700 text-lg rounded"
            aria-label="Full Name"
            required
          />
        )}

        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="p-3 my-3 w-full bg-gray-700 text-lg rounded"
          required
        />

        <div className="relative">
          <input
            ref={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="p-3 my-3 w-full bg-gray-700 text-lg rounded"
            aria-label="Password"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3 text-gray-400"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        
        <p className="text-red-500 font-bold text-lg py-1">{errorMessage}</p>
        
        <button
          type="submit"
          className="p-3 my-4 bg-red-700 w-full rounded-lg text-xl"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        
        <p className="py-2 cursor-pointer text-sm text-center" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign in Now..."}
        </p>
      </form>
    </div>
  );
};

export default Login;