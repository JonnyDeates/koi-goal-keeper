import React, {ReactNode} from 'react';
import './PageWrapper.css'

type PageWrapperProps = {
  header: string,
  children: ReactNode,

}

const PageWrapper = ({children, header}: PageWrapperProps) => {
  return <main className="PageWrapper">
    <h1>{header}</h1>
    {children}
  </main>;
};

export default PageWrapper;

