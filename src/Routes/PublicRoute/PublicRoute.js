import React from 'react'
import { Route } from 'react-router-dom'
import {GoalListContext} from "../../Components/GoalList/GoalListContext";

export default function PublicRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps => (
          <GoalListContext.Consumer>{(goalListContext) =>
              <Component goalListContext={goalListContext}
                         currentActive={componentProps.location} {...componentProps} />
          }
          </GoalListContext.Consumer>

      )}
    />
  )
}
