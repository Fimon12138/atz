import { useState } from "react";
import {
  createUserDocFromAuth,
  signInWithGooglePopup,
  signinAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signinAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocFromAuth(user);
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email' 
          name='email'
          type='email'  
          required 
          onChange={handleChange}
          value={email} 
        />
        <FormInput 
          label='Password'
          name='password'
          type='password'  
          required 
          onChange={handleChange}
          value={password} 
        />
        <div className="buttons-container">
          <Button type='submit'>Sign In</Button>
          <Button type='button' 
            onClick={logGoogleUser} buttonType='google'>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;