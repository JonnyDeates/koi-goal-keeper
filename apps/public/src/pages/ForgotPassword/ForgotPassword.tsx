import React, {type ChangeEvent, type FormEvent, useState} from "react";
import {Link} from "react-router-dom";
import {handleNextFocusEnter, handleSubmitEnter, Title, useError} from "@repo/shared";
import {validateEmail, validatePassword} from "@repo/utils";
import {Button, SpacedLabelInput} from "koi-pool";
import AuthenticationClient from "../../clients/AuthenticationClient";
import {UserInputs, useUserInputsContext} from "../../contexts/UserInputsProvider";

interface ForgotPasswordProps {
  isTokenPage?: boolean
}

function ForgotPassword({isTokenPage = false}: ForgotPasswordProps) {
  const {
    error,
    ErrorActions,
    handleCatchError
  } = useError<'password' | 'confirm-password' | 'email' | "request" | 'token'>();
  const [token, setToken] = useState("");

  const {email} = useUserInputsContext();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isVisible, setVisibility] = useState(false);

  const handleNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    ErrorActions.remove("password");
    setNewPassword(event.target.value);
  };
  const handleToken = (event: ChangeEvent<HTMLInputElement>) => {
    ErrorActions.remove("token");
    setToken(event.target.value);
  };
  const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    ErrorActions.remove("confirm-password");
    setConfirmPassword(event.target.value);
  };
  // const toggleVisibility = () => {
  //   setVisibility(!isVisible);
  // };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ErrorActions.reset();

    const emailResponse = validateEmail(email);
    if (emailResponse)
      ErrorActions.add('email', emailResponse);
    else if (!isTokenPage) {
      submitForTokenCreation();
    } else {
      const passwordResponse = validatePassword(newPassword);
      let hasFailed = false;
      if (passwordResponse) {
        ErrorActions.add('password', passwordResponse);
        hasFailed = true;
      }
      if (newPassword !== confirmPassword) {
        ErrorActions.add('confirm-password', "Passwords do not Match");
      }
      if (!hasFailed) {
        submitToResetPassword();
      }
    }
  };

  const submitForTokenCreation = () => {
    AuthenticationClient.postForgotPassword(email)
      .then(() => {
        window.location.replace(`/forgot-password/token?email=${email}`);
      })
      .catch(handleCatchError);
  };

  const submitToResetPassword = () => {
    AuthenticationClient.postVerification(email, token, newPassword)
      .then(() => {
        window.location.replace("/login");
      })
      .catch(handleCatchError);
  };

  const submitText = (isTokenPage) ? "Verify" : "Submit";
  // const type = isVisible ? "text" : "password";

  return (
    <div className="Login">
      <form className="LoginContent" onSubmit={handleSubmit}>
        <Title/>
        <h3>{(isTokenPage) ? "Enter Token & Your New Password" : "Enter Your Email for the Account"}</h3>
        <UserInputs error={error} ErrorActions={ErrorActions} isPasswordShown={false}
                    emailOnKeyDown={(e) =>
                      isTokenPage ? handleNextFocusEnter(e) : handleSubmitEnter(e, handleSubmit)
                    }/>
        {(isTokenPage ? <>
          <SpacedLabelInput label="Token"
                            value={token}
                            onChange={handleToken}
                            error={error.token}
                            onKeyDown={handleNextFocusEnter}
          />
          <SpacedLabelInput label="New Password"
                            value={newPassword}
                            onChange={handleNewPassword}
                            error={error.password}
                            onKeyDown={handleNextFocusEnter}
                            width="200px"
                            type="password"
          />
          <SpacedLabelInput label="Confirm Password"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            width="200px"
                            type="password"
                            error={error["confirm-password"]}
                            onKeyDown={handleNextFocusEnter}
          />
        </> : null)}
        {error.request ? <p className="Error">{error.request}</p> : null}
        <div className="LoginButtons">
          <Link to={'/login'}>
            <Button variant="cancel">
              Back
            </Button>
          </Link>
          <Button type="submit" variant="accept">
            {submitText}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
