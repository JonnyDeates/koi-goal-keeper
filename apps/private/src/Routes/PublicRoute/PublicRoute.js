import React from 'react'
import { Route } from 'react-router-dom';

export default function PublicRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps => (
              <Component currentActive={componentProps.location} {...componentProps} />
      )}
    />
  )
}
