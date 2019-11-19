import React from 'react';

class GoalItem extends React.Component {
    render() {
        return (
            <div className={'goallist-item '+this.props.bgColor}>
                <input type='checkbox' onChange={()=> this.props.handleChecked(this.props.id)} checked={this.props.checked}/>
                <p>{this.props.goal}</p>
                <button onClick={()=> this.props.deleteGoal(this.props.id)}>X</button>
            </div>
        );
    }

}


export default GoalItem;

