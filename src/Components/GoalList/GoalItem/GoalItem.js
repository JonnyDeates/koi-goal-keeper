import React from 'react';
import CircleButton from "./CircleButton/CircleButton";

class GoalItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            isEditable: this.props.isEditable,
            deleteGoal: this.props.deleteGoal,
            className: this.props.className,
            value: this.props.goal
        };
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    componentDidMount() {
        if(this.props.newObj){
            this.setState({isEditing: true})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                isEditable: this.props.isEditable,
                deleteGoal: this.props.deleteGoal,
                value: this.props.goal
            })
        }
        if(prevProps.className !== this.props.className){
            this.setState({className: this.props.className})
        }
    }

    toggleEdit() {
        this.props.handleEditGoal(this.state.value, this.props.goalId, this.props.id);
        this.setState({isEditing: !this.state.isEditing})
    }

    render() {
        return (
            <li className={'goallist-item ' + this.state.className} style={{backgroundColor: this.props.bgColor, color: this.props.fontColor}}>
                {(this.props.past) ? (this.props.checked) ? <h6>Completed</h6> : <h6>Unchecked</h6> : ''}
                {(this.props.showChecked) ? <input className="checkboxinput" type='checkbox'
                                                   onChange={() => this.props.handleChecked(this.props.goalId, this.props.id)}
                                                   checked={(typeof this.props.checked === 'boolean' ? this.props.checked : false)}/> : ''}
                {(typeof this.props.past === 'boolean'? this.props.past : false) ? <p>{this.props.goal}</p> : (this.state.isEditing) ? <input type="text" className="textinput"
                                                 onChange={(e) => this.setState({value: e.target.value})}
                                                 value={this.state.value}
                                                 onKeyPress={e => {
                                                     if (e.key === 'Enter') {
                                                         e.preventDefault();
                                                         this.toggleEdit();

                                                     }
                                                 }}
                /> : <p onDoubleClick={this.toggleEdit}>{this.props.goal}</p>}
                <div>
                    {(this.props.compacted === 'No') ? <CircleButton past={this.props.past} toggleEdit={this.toggleEdit}
                                                                     isEditing={this.state.isEditing} id={this.props.id}
                                                                     handleObjectiveClone={this.props.handleObjectiveClone}
                                                                     goalId={this.props.goalId}
                                                                     showDelete={this.props.showDelete}
                                                                     deleteGoal={this.state.deleteGoal}
                                                                     isEditable={this.props.isEditable}/> :
                        <div className={'row-buttons'}>
                            {(this.state.isEditable) ? <img onClick={this.toggleEdit} alt={'edit'}
                                                            src={(this.state.isEditing) ? require('../../../assets/icons/plus.svg') : require('../../../assets/icons/pencil.svg')}/> : ''}
                            <img onClick={() => this.props.handleObjectiveClone(this.props.goalId, this.props.id)}
                                 alt={'copy'}
                                 src={require('../../../assets/icons/copy.svg')}/>
                            {(this.props.showDelete) ? <img
                                onClick={() => this.props.deleteGoal(this.props.goalId, this.props.id)}
                                alt={'copy'} src={require('../../../assets/icons/trash.svg')}/> : ''}
                        </div>}
                </div>
            </li>
        );
    }

}


export default GoalItem;

