import React from 'react';

class GoalItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            isEditable: this.props.isEditable,
            deleteGoal: this.props.deleteGoal
        };
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    toggleEdit() {
        this.setState({isEditing: !this.state.isEditing})
    }

    render() {
        return (
            <li className={'goallist-item ' + this.props.bgColor}>
                {(this.props.past) ? (this.props.checked) ? <h6>Completed</h6> : <h6>Unchecked</h6> : ''}
                {(this.props.showChecked) ? <input className="checkboxinput" type='checkbox'
                                                   onChange={() => this.props.handleChecked(this.props.goalId, this.props.id)}
                                                   checked={this.props.checked}/> : ''}
                {(this.state.isEditing && this.state.isEditable) ? <input type="text" className="textinput"
                                                                          onChange={(e) => this.props.handleEditGoal(e, this.props.id)}
                                                                          value={this.props.goal}
                                                                          onKeyPress={e => {
                                                                              if (e.key === 'Enter') {
                                                                                  e.preventDefault();
                                                                                  this.toggleEdit();
                                                                              }
                                                                          }}
                /> : <p onDoubleClick={this.toggleEdit}>{this.props.goal}</p>}

                <div>{(this.state.isEditable) ? <img onClick={this.toggleEdit} alt={'edit'}
                                                     src={(this.state.isEditing) ? require('../../assets/icons/plus.ico') : require('../../assets/icons/pencil.ico')}/> : ''}
                    {(this.props.showDelete) ? <button type="button" className="close-button"
                            onClick={() => this.state.deleteGoal(this.props.goalId, this.props.id)}>X
                    </button> : ''}
                </div>
            </li>
        );
    }

}


export default GoalItem;

