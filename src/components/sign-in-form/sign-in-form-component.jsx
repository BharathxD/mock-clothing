import { useState } from "react";
import { signInWithGooglePopup,signInUserAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component"
import { SignInContainer,ButtonsContainer } from "./sign-in-form.styles";
import Button from "../button/button.component";

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signInUserAuthWithEmailAndPassword(email,password);
            
            resetFormFields();
            
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect Password")
                    break;
                case "auth/user-not-found":
                    alert("No User Is Associated With this Email")
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
       const {name, value} = event.target;
       setFormFields({...formFields, [name]: value})
    }

    return (
        <SignInContainer>
            <h2>Already Have An Account?</h2>
            <span>Try Signing In</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <ButtonsContainer>
                    <Button type="submit"> Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;