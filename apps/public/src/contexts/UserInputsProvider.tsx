import React, {
  ChangeEvent,
  KeyboardEvent,
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useState,
  KeyboardEventHandler
} from "react";
import {type ErrorType} from "@repo/types";
import {ErrorActionsType, handleNextFocusEnter, handleSubmitEnter} from "@repo/shared";
import {SpacedLabelInput} from "koi-pool";


type UserInputsContextType = {
  email: string,
  password: string,
  handlePasswordInput: (event: ChangeEvent<HTMLInputElement>) => void,
  handleEmailInput: (event: ChangeEvent<HTMLInputElement>) => void
}

const UserInputsContext = createContext<UserInputsContextType>({} as UserInputsContextType);


export const UserInputsProvider = ({children}: { children: ReactNode }) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [isShown, setIsShown] = useState<boolean>(false);
  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);


  return <UserInputsContext.Provider value={{handleEmailInput, handlePasswordInput, email, password}}>
    {children}
  </UserInputsContext.Provider>
};
export const useUserInputsContext = () => useContext(UserInputsContext);


type UserInputsProps<T> = {
  error: ErrorType<'password' | 'email' | T>,
  ErrorActions: ErrorActionsType<T>,
  isPasswordShown?: boolean,
  emailOnKeyDown?: KeyboardEventHandler<HTMLInputElement>
  passwordOnKeyDown?: KeyboardEventHandler<HTMLInputElement>
}

export const UserInputs = ({

                             error,
                             ErrorActions,
                             isPasswordShown = true,
                             emailOnKeyDown = handleNextFocusEnter,
                            passwordOnKeyDown = handleNextFocusEnter
                           }: UserInputsProps<'email' | 'password'>) => {
  const {email, handleEmailInput, handlePasswordInput, password} = useUserInputsContext();

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    ErrorActions.remove("email");
    handleEmailInput(event);
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    ErrorActions.remove("password");
    handlePasswordInput(event)
  };

  return <>
    <SpacedLabelInput label="Email"
                      onChange={handleEmail}
                      onKeyDown={emailOnKeyDown as KeyboardEventHandler<HTMLInputElement>}
                      value={email}
                      width="200px"
                      type="text"
                      autoComplete="email"
                      error={error.email ? error.email : ''}
    />
    {isPasswordShown ?
      <SpacedLabelInput label="Password"
                        onChange={handlePassword}
                        onKeyDown={passwordOnKeyDown as KeyboardEventHandler<HTMLInputElement>}
                        width="200px"
                        value={password}
                        type='password'
                        autoComplete="current-password"
                        error={error.password ? error.password : ''}
      /> : <></>}
  </>
}