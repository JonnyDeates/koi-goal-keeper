import React, {type FormEvent} from "react";
import {Link} from "react-router-dom";
import {Button} from "koi-pool";
import {gotoPageHardRefresh, validateEmail, validatePassword} from "@repo/utils";
import {handleSubmitEnter, Title, useError} from "@repo/shared";
import "./Login.css";
import AuthenticationClient from "../../clients/AuthenticationClient";
import {UserInputs, useUserInputsContext} from "../../contexts/UserInputsProvider";

export function Login() {
  const {error, ErrorActions} = useError<'password' | 'email' | "request">();
  const {email, password} = useUserInputsContext();

  const postMethod = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailReason = validateEmail(email);
    const passwordReason = validatePassword(password);

    if (emailReason) {
      ErrorActions.add("email", emailReason);
    }
    if (passwordReason) {
      ErrorActions.add("password", passwordReason);
    }

    if (!emailReason && !passwordReason) {
      AuthenticationClient.postLogin(
        email.toLowerCase().trim(),
        password
      )
        .then((res: { data: { redirectURL: string } }) => {
          gotoPageHardRefresh(res.data.redirectURL);
        })
        .catch(({response: {data: {error: newError}}}: { response: { data: { error: object | string } } }) => {
          if (typeof newError === 'object')
            ErrorActions.set(newError);
          else
            ErrorActions.add("request", newError);
        });
    }
  };


  // const passwordType = isShown ? "text" : "password";

  return <div className="Login">
    <form className="LoginContent" onSubmit={postMethod}>
      <Title/>
      <UserInputs ErrorActions={ErrorActions} error={error}
                  passwordOnKeyDown={(e) => handleSubmitEnter(e, postMethod)}/>
      {/*<img src={eye} alt="Check Password" onClick={() => setIsShown(!isShown)} />*/}

      <div className="forgot-password">
        <Link to={`/forgot-password`}>Forgot Password?</Link>
      </div>
      {error.request ? <p className="Error">{error.request}</p> : null}
      <div className="LoginButtons">
        <Link to={`/sign-up`}>
          <Button style={{width: '120px'}} variant="accept">Sign Up</Button>
        </Link>
        <Button style={{width: '120px'}} type="submit" variant="accept">Login</Button>
      </div>
    </form>
  </div>;
}
