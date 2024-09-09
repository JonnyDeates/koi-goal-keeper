import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import TokenService from "../../services/local/token-service";
import {GoalListContext} from "../../components/GoalList/GoalListContext";

export default function PrivateRoute({component, ...props}) {

    const Component = component;

    return (
        <Route
            {...props}
            render={componentProps => (
                <>
                    {!!TokenService.hasAuthToken() ?
                        <GoalListContext.Consumer>{(goalListContext) =>
                        <Component goalListContext={goalListContext} currentActive={componentProps.location} {...componentProps} />
                        }</GoalListContext.Consumer>
                        : (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: {from: componentProps.location},
                                }}
                            />
                        )
                    }

                </>
            )}
        />
    )
}
