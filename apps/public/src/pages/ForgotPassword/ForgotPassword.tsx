import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {handleEnter, handleNextFocusEnter, handleSubmitEnter, Title, useError} from "@repo/shared";
import {validateEmail, validatePassword} from "@repo/utils";
import AuthenticationClient from "../../clients/AuthenticationClient";
import {Button, SpacedLabelInput} from "koi-pool";

type ForgotPasswordProps = { isTokenPage?: boolean }

const ForgotPassword = ({isTokenPage = false}: ForgotPasswordProps) => {
        const {error, ErrorActions} = useError<'password' | 'confirm-password' | 'email' | "request" | 'token'>();
        const [token, setToken] = useState("");
        const [newPassword, setNewPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [isVisible, setVisibility] = useState(false);
        const [email, setEmail] = useState("");

        const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
            ErrorActions.remove("email");
            setEmail(event.target.value);
        }
        const handleNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
            ErrorActions.remove("password");
            setNewPassword(event.target.value);
        }
        const handleToken = (event: ChangeEvent<HTMLInputElement>) => {
            ErrorActions.remove("token");
            setToken(event.target.value);
        }
        const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
            ErrorActions.remove("confirm-password");
            setConfirmPassword(event.target.value);
        }
        const toggleVisibility = () => setVisibility(!isVisible);

        useEffect(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const myParam = urlParams.get("email");
            if (myParam) {
                setEmail(myParam);
            }
        }, []);


        const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            ErrorActions.reset();

            const emailResponse = validateEmail(email);
            if (emailResponse)
                ErrorActions.add('email', emailResponse)
            else {
                if (!isTokenPage) {
                    submitForTokenCreation();
                } else {
                    const passwordResponse = validatePassword(newPassword)
                    let hasFailed = false
                    if (passwordResponse) {
                        ErrorActions.add('password', passwordResponse)
                        hasFailed = true
                    }
                    if (newPassword !== confirmPassword) {
                        ErrorActions.add('confirm-password', "Passwords do not Match")
                    }
                    if (!hasFailed) {
                        submitToResetPassword();
                    }
                }
            }
        };

        const submitForTokenCreation = () => {
            AuthenticationClient.postForgotPassword(email)
                .then(() => window.location.replace(`/forgot-password/token?email=${email}`))
                .catch(({response: {data: {error}}}) => {
                    if (typeof error === 'object')
                        ErrorActions.set(error);
                    else
                        ErrorActions.add("request", error)
                });

        };

        const submitToResetPassword = () => {

            AuthenticationClient.postVerification(email, token, newPassword)
                .then(() => window.location.replace("/login"))
                .catch(({response: {data: {error}}}) => {
                    if (typeof error === 'object')
                        ErrorActions.set(error);
                    else
                        ErrorActions.add("request", error)
                });
        }

        const submitText = (isTokenPage) ? "Verify" : "Submit";
        const type = isVisible ? "text" : "password";

        return (
            <div className="Login">
                <form className={"LoginContent"} onSubmit={handleSubmit}>
                    <Title/>
                    <h3>{(isTokenPage) ? "Enter Token & Your New Password" : "Enter Your Email for the Account"}</h3>
                    <SpacedLabelInput label={"Email"} onChange={handleEmail} value={email} error={error.email}
                                      width={"200px"}
                                      onKeyDown={(e) => isTokenPage ? handleNextFocusEnter(e) : handleSubmitEnter(e, handleSubmit)}
                    />
                    {(isTokenPage &&
                        <>
                            <SpacedLabelInput label={"Token"}
                                              value={token}
                                              onChange={handleToken}
                                              error={error.token}
                                              onKeyDown={handleNextFocusEnter}
                            />
                            <SpacedLabelInput label={"New Password"}
                                              value={newPassword}
                                              onChange={handleNewPassword}
                                              error={error.password}
                                              onKeyDown={handleNextFocusEnter}
                                              width={"200px"}
                                              type={'password'}
                            />
                            <SpacedLabelInput label={"Confirm Password"}
                                              value={confirmPassword}
                                              onChange={handleConfirmPassword}
                                              width={"200px"}
                                              type={'password'}
                                              error={error["confirm-password"]}
                                              onKeyDown={handleNextFocusEnter}
                            />
                        </>)}
                    {error.request && <p className="Error">{error.request}</p>}
                    <div className="LoginButtons">
                        <Link to={`/login${email ? `/?email=${email}` : ''}`}>
                            <Button variant={'cancel'}>
                                Back
                            </Button>
                        </Link>
                        <Button type="submit" variant={'accept'}>
                            {submitText}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
;

export default ForgotPassword;
