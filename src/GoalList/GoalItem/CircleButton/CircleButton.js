import React from 'react';
import "./CircleButton.css"
class CircleButton extends React.Component {
    render() {
        return (
            (!this.props.past) ?
            (this.props.showDelete) ?
                            <div className="circle-outer">
                                <ul className="circle">
                                    <li>
                                        <div className="content first">
                                            <div className="icon">
                                            </div>
                                            {(this.props.isEditable) ? <img onClick={()=>this.props.toggleEdit()} alt={'edit'}
                                                                            src={(this.props.isEditing) ? require('../../../assets/icons/plus.ico') : require('../../../assets/icons/pencil.ico')}/> : ''}
                                        </div>
                                        <div className="background"/>
                                    </li>
                                    <li>
                                        <div className="content second">
                                            <div className="icon">
                                            </div>
                                            <img
                                                onClick={() => this.props.handleObjectiveClone(this.props.goalId, this.props.id)}
                                                alt={'copy'} src={require('../../../assets/icons/copy.ico')}/>

                                        </div>
                                        <div className="background"/>
                                    </li>
                                    <li>
                                        <div className="content third">
                                            <div className="icon">
                                            </div>
                                            <img
                                                onClick={() => this.props.deleteGoal(this.props.goalId, this.props.id)}
                                                alt={'copy'} src={require('../../../assets/icons/trash.ico')}/>
                                        </div>
                                        <div className="background"/>
                                    </li>
                                </ul>
                            </div> :
                            <div className="circle-outer">
                                <ul className="circle-split">
                                    <li>
                                        <div className="content first">
                                            <div className="icon">
                                            </div>
                                            {(this.props.isEditable) ? <img onClick={this.props.toggleEdit} alt={'edit'}
                                                                            src={(this.props.isEditing) ? require('../../../assets/icons/plus.ico') : require('../../../assets/icons/pencil.ico')}/> : ''}
                                        </div>
                                        <div className="background"/>
                                    </li>
                                    <li>
                                        <div className="content second">
                                            <div className="icon">
                                            </div>
                                            <img
                                                onClick={() => this.props.handleObjectiveClone(this.props.goalId, this.props.id)}
                                                alt={'copy'} src={require('../../../assets/icons/copy.ico')}/>
                                        </div>
                                        <div className="background"/>
                                    </li>
                                </ul>
                            </div> : (this.props.showDelete) ?
                <div className="circle-outer">
                    <ul className="circle-split">
                        <li>
                            <div className="content first">
                                <div className="icon">
                                </div>
                                <img
                                    onClick={() => this.props.handleObjectiveClone(this.props.goalId, this.props.id)}
                                    alt={'copy'} src={require('../../../assets/icons/copy.ico')}/>
                            </div>
                            <div className="background"/>
                        </li>
                        <li>
                            <div className="content second">
                                <div className="icon">
                                </div>
                                <img
                                    onClick={() => this.props.deleteGoal(this.props.goalId, this.props.id)}
                                    alt={'copy'} src={require('../../../assets/icons/trash.ico')}/>

                            </div>
                            <div className="background"/>
                        </li>
                    </ul>
                </div> :
                <div className="circle-outer">
                    <div className="circle">
                        <img onClick={() => this.props.handleObjectiveClone(this.props.goalId, this.props.id)}
                             alt={'copy'} src={require('../../../assets/icons/copy.ico')}/>
                            <div className="background"/>
                    </div>
                </div>

        );
    }

}


export default CircleButton;

