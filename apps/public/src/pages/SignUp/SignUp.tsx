import React, {type ChangeEvent, type FormEvent, useState} from "react";
import {Link} from "react-router-dom";
import {Button, GenericModalWithTabs, SpacedLabelInput} from "koi-pool";
import {gotoPageHardRefresh, validateEmail, validateName, validateSignUpPassword} from "@repo/utils";
import {Title, useError} from "@repo/shared";
import AuthenticationClient from "../../clients/AuthenticationClient";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "./components/Privacy Policy/PrivacyPolicy";
import {UserInputs, useUserInputsContext} from "../../contexts/UserInputsProvider";
import './SignUp.css'
function SignUp() {
  const {email, password} = useUserInputsContext();
  const [name, setName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const {
    error,
    ErrorActions,
    handleCatchError
  } = useError<'password' | 'email' | 'name' | 'confirm-password' | 'request'>();

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    ErrorActions.remove("name");
    setName(event.target.value);
  };
  const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    ErrorActions.remove("confirm-password");
    setConfirmPassword(event.target.value);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCancelTerms = () => {
    setAcceptTerms(false);
    handleCloseModal();
  };
  const handleAcceptTerms = () => {
    setAcceptTerms(true);
    handleCloseModal();
  };

  const postMethod = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let hasFailed = false;
    const emailReason = validateEmail(email);
    const passwordReason = validateSignUpPassword(password);
    const nameReason = validateName(name);

    if (!acceptTerms)
      return;

    if (nameReason) {
      ErrorActions.add("name", nameReason);
      hasFailed = true;
    }
    if (emailReason) {
      ErrorActions.add("email", emailReason);
      hasFailed = true;
    }
    if (passwordReason) {
      ErrorActions.add('password', passwordReason);
      hasFailed = true;
    }
    if (password !== confirmPassword) {
      ErrorActions.add('confirm-password', "Passwords don't Match");
      hasFailed = true;
    }
    if (!hasFailed) {

      AuthenticationClient
        .postUser(email.toLowerCase().trim(), name.trim(), password)
        .then(() => {
          gotoPageHardRefresh('/');
        })
        .catch(handleCatchError);

    }

  };

  const actionButtons = [
    <Button key='Cancel-Button' variant="cancel" onClick={handleCancelTerms}>Cancel</Button>,
    <Button key='Accept-Button' variant="accept" onClick={handleAcceptTerms}>Accept</Button>
  ];

  return <div className="Login SignUp">
    <form className="LoginContent" onSubmit={postMethod}>
      <Title/>
      <SpacedLabelInput label="Name:"
                        onChange={handleName}
                        value={name}
                        width="200px"
                        error={error.name ? error.name : ''}
                        autoComplete="name"

      />
      <UserInputs error={error}
                  ErrorActions={ErrorActions}
      />
      <SpacedLabelInput label="Confirm Password:" onChange={handleConfirmPassword}
                        value={confirmPassword}
                        type="password"
                        width="200px"
                        autoComplete="new-password"
                        error={error['confirm-password'] as string}
      />
      <label className="AcceptTerms">Accept Terms & Conditions & Privacy Policy
        <input type="checkbox"
               checked={acceptTerms}
               onChange={handleOpenModal}/>
      </label>
      {error.request ? <p className="Error">{error.request}</p> : null}
      <div className="LoginButtons">
        <Link to={`/login`}>
          <Button type="reset" variant="cancel">Back</Button>
        </Link>
        <Button disabled={!acceptTerms} type="submit" variant="accept">
          Submit
        </Button>
      </div>
    </form>
    <GenericModalWithTabs isOpen={modalOpen}
                          cardAttributes={{className: "ModalContent"}}
                          tabs={[
                            {title: "Terms & Conditions", body: <TermsAndConditions/>, actionButtons},
                            {title: "Privacy Policy", body: <PrivacyPolicy/>, actionButtons}
                          ]}
                          handleClose={handleCloseModal}/>
  </div>;
}

export default SignUp;