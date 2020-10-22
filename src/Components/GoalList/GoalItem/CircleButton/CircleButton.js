import React from 'react';
import "./CircleButton.css"
class CircleButton extends React.Component {
    render() {
        const edit = this.props.isEditing ? require('../../../../assets/icons/plus.svg') : require('../../../../assets/icons/pencil.svg')
        const trash = require('../../../../assets/icons/trash.svg');
        const copy = require('../../../../assets/icons/copy.svg');
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
                                                                            src={edit}/> : ''}
                                        </div>
                                        <div className="background"/>
                                    </li>
                                    <li>
                                        <div className="content second">
                                            <div className="icon">
                                            </div>
                                            <img
                                                onClick={() => this.props.handleObjectiveClone(this.props.goalId, this.props.id)}
                                                alt={'copy'} src={copy}/>

                                        </div>
                                        <div className="background"/>
                                    </li>
                                    <li>
                                        <div className="content third">
                                            <div className="icon">
                                            </div>
                                            <img
                                                onClick={() => this.props.deleteGoal(this.props.goalId, this.props.id)}
                                                alt={'copy'} src={trash}/>
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
                                                                            src={edit}/> : ''}
                                        </div>
                                        <div className="background"/>
                                    </li>
                                    <li>
                                        <div className="content second">
                                            <div className="icon">
                                            </div>
                                            <img
                                                onClick={() => this.props.handleObjectiveClone(this.props.goalId, this.props.id)}
                                                alt={'copy'} src={copy}/>
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
                                    alt={'copy'} src={copy}/>
                            </div>
                            <div className="background"/>
                        </li>
                        <li>
                            <div className="content second">
                                <div className="icon">
                                </div>
                                <img
                                    onClick={() => this.props.deleteGoal(this.props.goalId, this.props.id)}
                                    alt={'copy'} src={trash}/>

                            </div>
                            <div className="background"/>
                        </li>
                    </ul>
                </div> :
                <div className="circle-outer">
                    <div className="circle">
                        <img onClick={() => this.props.handleObjectiveClone(this.props.goalId, this.props.id)}
                             alt={'copy'} src={copy}/>
                            <div className="background"/>
                    </div>
                </div>

        );
    }

}


export default CircleButton;

