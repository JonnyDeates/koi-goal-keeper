import React from 'react';
import {Link} from 'react-router-dom';
class PastGoals extends React.Component {
    render() {
        return (
            <div>
                <h1>Page</h1>
                <h1>Page</h1>
                <h1>Page</h1>
                {this.props.types.map((type, i)=><Link key={i} to={'/past-goals/' + type}>{type}</Link>)}
            </div>
        )
    }
}
export default PastGoals;