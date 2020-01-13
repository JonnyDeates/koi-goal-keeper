import React from 'react';
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div className={'footer-wrapper'}>
                <div className='footer'>
                    <a href={'https://github.com/JonnyDeates/koi-goal-keeper'}>Github</a>
                    <a href={'https://jonnydeates.com'}>Jonny Deates</a>
                    <a href={'https://www.linkedin.com/in/jonnydeates/'}>Linked-in</a>
                </div>
                <p>© 2019 Jonny Deates. All rights reserved.</p>

            </div>
        );
    }
}

export default Footer;
