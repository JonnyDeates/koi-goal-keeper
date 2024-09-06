import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {Button, GenericModalWithTabs, SpacedLabelInput} from "koi-pool";
import PrivacyPolicy from "./components/Privacy Policy/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import {validateEmail, validateName, validateSignUpPassword} from "@repo/utils";
import {Title, useError} from "@repo/shared";
import AuthenticationClient from "../../clients/AuthenticationClient";

const SignUp = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const {error, ErrorActions} = useError<'password' | 'email' | 'name' | 'confirm-password' | 'request'>()

    const handleName = (event: ChangeEvent<HTMLInputElement>) => {
        ErrorActions.remove("name");
        setName(event.target.value);
    }
    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        ErrorActions.remove("email");
        setEmail(event.target.value);
    }
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        ErrorActions.remove("password");
        setPassword(event.target.value);
    }
    const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
        ErrorActions.remove("confirm-password");
        setConfirmPassword(event.target.value);
    }

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleCancelTerms = () => {
        setAcceptTerms(false);
        handleCloseModal();
    }
    const handleAcceptTerms = () => {
        setAcceptTerms(true);
        handleCloseModal();
    }

    const postMethod = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let hasFailed = false;
        const emailReason = validateEmail(email);
        const passwordReason = validateSignUpPassword(password)
        const nameReason = validateName(name)

        if (!acceptTerms)
            return;

        if (nameReason) {
            ErrorActions.add("name", nameReason);
            hasFailed = true;
        }
        if (emailReason) {
            ErrorActions.add("email", emailReason)
            hasFailed = true;
        }
        if (passwordReason) {
            ErrorActions.add('password', passwordReason)
            hasFailed = true;
        }
        if (password !== confirmPassword) {
            ErrorActions.add('confirm-password', "Passwords don't Match");
            hasFailed = true;
        }
        if (!hasFailed) {
            AuthenticationClient
                .postUser(email.toLowerCase().trim(), name.trim(), password)
                .then(() => window.location.href = '/')
                .catch(({response: {data: {error}}}) => {
                    if (typeof error === 'object') {
                        ErrorActions.set(error)
                    } else {
                        ErrorActions.add('request', error)
                    }
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

    const actionButtons = [
        <Button variant={'cancel'} onClick={handleCancelTerms}>Cancel</Button>,
        <Button variant={'accept'} onClick={handleAcceptTerms}>Accept</Button>
    ]

    return <div className={"Login"}>
        <form className={"LoginContent"} onSubmit={postMethod}>
            <Title/>
            <SpacedLabelInput label={'Name:'}
                              onChange={handleName}
                              value={name}
                              width={"200px"}
                              error={error['name']}
                              autoComplete={"name"}

            />
            <SpacedLabelInput label={'Email:'} onChange={handleEmail} value={email} width={"200px"}
                              error={error['email']}
                              autoComplete={"email"}

            />
            <SpacedLabelInput label={'Password:'}
                              onChange={handlePassword}
                              value={password}
                              width={"200px"}
                              error={error['password']}
                              autoComplete={"new-password"}
                              type={'password'}

            />
            <SpacedLabelInput label={'Confirm Password:'} onChange={handleConfirmPassword}
                              value={confirmPassword}
                              type={'password'}
                              width={"200px"}
                              autoComplete={"new-password"}
                              error={error['confirm-password']}
            />
            <label className={"AcceptTerms"}>Accept Terms & Conditions & Privacy Policy
                <input type={"checkbox"}
                       checked={acceptTerms}
                       onChange={handleOpenModal}/>
            </label>
            {error.request && <p className={"Error"}>{error.request}</p>}
            <div className={"LoginButtons"}>
                <Link to={`/login${email ? `/?email=${email}` : ''}`}>
                    <Button type="reset" variant={'cancel'}>Back</Button>
                </Link>
                <Button disabled={!acceptTerms} type="submit" variant={'accept'}>
                    Submit
                </Button>
            </div>
        </form>
        <GenericModalWithTabs isOpen={modalOpen}
                              tabs={[
                                  {title: "Terms & Conditions", body: <TermsAndConditions/>, actionButtons},
                                  {title: "Privacy Policy", body: <PrivacyPolicy/>, actionButtons}
                              ]}
                              handleClose={handleCloseModal}/>
    </div>;
};
export default SignUp;