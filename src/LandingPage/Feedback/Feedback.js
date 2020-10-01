import React from 'react';
import './Feedback.css';

class Feedback extends React.Component {
    render() {
        return (
            <section className='feedback'>
                <p>
                    Here at the Koi Foundation we are always looking to improve, and any and all feedback is always appreciated!
                </p>
                <button onClick={()=> window.open('https://docs.google.com/forms/d/e/1FAIpQLSdyJUKH1up4ndOoDMisq5Dv57xlRU-IgNCD8nl3dI3qsc5UFA/viewform')}>Leave Feedback</button>
            </section>

        );
    }
}

export default Feedback;
