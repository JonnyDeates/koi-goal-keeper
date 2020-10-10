import React from 'react';
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <footer className={'footer-wrapper'}>
                <div className='footer'>
                    <a href={'https://github.com/JonnyDeates/koi-goal-keeper'}>Github</a>
                    <a href={'https://koifoundation.com/'}>The Koi Foundation</a>
                    <a href={'https://koitimer.com'}>KoiTimer</a>
                </div>
                <p>© 2020 The Koi Foundation LLC. All rights reserved.</p>

            </footer>
        );
    }
}

export default Footer;
