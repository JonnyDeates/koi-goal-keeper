import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import TokenService from "../services/token-service";
import {GoalListContext} from "../GoalList/GoalListContext";

export default function PrivateRoute({component, ...props}) {

    const Component = component;

    return (
        <Route
            {...props}
            render={componentProps => (
                <>
                    {!!TokenService.hasAuthToken() ?
                        <GoalListContext.Consumer>{(goalListContext) =>
                       <Component goalListContext={goalListContext}
                                       currentActive={componentProps.location} {...componentProps} />
                        }
                        </GoalListContext.Consumer>
                        : (
                            <Redirect
                                to={{
                                    pathname: '/login',
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
