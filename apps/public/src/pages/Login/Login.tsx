import React, {useEffect,type ChangeEvent, type FormEvent, useState} from "react";
import {Link} from "react-router-dom";
import {Button, SpacedLabelInput} from "koi-pool";
import {gotoPageHardRefresh, validateEmail, validatePassword} from "@repo/utils";
import {handleSubmitEnter, Title, useError,handleNextFocusEnter} from "@repo/shared";
import "./Login.css";
import AuthenticationClient from "../../clients/AuthenticationClient";

export function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // const [isShown, setIsShown] = useState<boolean>(false);
    const {error, ErrorActions} = useError<'password' | 'email' | "request">();

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        ErrorActions.remove("email");
        setEmail(event.target.value);
    };
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        ErrorActions.remove("password");
        setPassword(event.target.value);
    };

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
                .then((res: {data: {redirectURL: string}}) => { gotoPageHardRefresh(res.data.redirectURL); })
                .catch(({response: {data: {error: newError}}}: {response: {data: {error: object | string}}}) => {
                    if (typeof newError === 'object')
                        ErrorActions.set(newError);
                    else
                        ErrorActions.add("request", newError);
                });
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get("email");
        if (myParam) {
            setEmail(myParam);
        }
    }, []);

    // const passwordType = isShown ? "text" : "password";

    return <div className="Login">
        <form className="LoginContent" onSubmit={postMethod}>
            <Title/>
            <SpacedLabelInput label="Email"
                              onChange={handleEmail}
                              onKeyDown={handleNextFocusEnter}
                              value={email}
                              width="200px"
                              type="text"
                              autoComplete="email"
                              error={error.email}
            />
            <SpacedLabelInput label="Password"
                              onChange={handlePassword}
                              onKeyDown={e => { handleSubmitEnter(e, postMethod); }}
                              width="200px"
                              value={password}
                              type='password'
                              autoComplete="current-password"
                              error={error.password}
            />
            {/*<img src={eye} alt="Check Password" onClick={() => setIsShown(!isShown)} />*/}

            <div className="forgot-password">
                <Link to={`/forgot-password${email ? `/?email=${email}` : ''}`}>Forgot Password?</Link>
            </div>
            {error.request ? <p className="Error">{error.request}</p> : null}
            <div className="LoginButtons">
                <Link to={`/sign-up${email ? `/?email=${email}` : ''}`}>
                    <Button style={{width: '120px'}} variant="accept">Sign Up</Button>
                </Link>
                <Button style={{width: '120px'}} type="submit" variant="accept">Login</Button>
            </div>
        </form>
    </div>;
}
