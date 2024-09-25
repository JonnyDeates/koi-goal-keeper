import React from 'react';
import './Feedback.css';

class Feedback extends React.Component {
    render() {
        return (
            <div className='feedback'>
                <button onClick={()=> window.open('https://docs.google.com/forms/d/e/1FAIpQLSdyJUKH1up4ndOoDMisq5Dv57xlRU-IgNCD8nl3dI3qsc5UFA/viewform')}>Leave Feedback</button>
            </div>

        );
    }
}

export default Feedback;
