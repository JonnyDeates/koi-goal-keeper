import React from 'react';
import {Link} from 'react-router-dom';
import './PastGoals.css'
class PastGoals extends React.Component {
    render() {
        return (
            <div>
                <h1>Past Goals</h1>
                <div className='pastgoal-links'>
                {this.props.types.map((type, i)=><Link key={i} to={'/past-goals/' + type}>{type}</Link>)}
                </div>
            </div>
        )
    }
}
export default PastGoals;