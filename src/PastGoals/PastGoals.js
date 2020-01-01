import React from 'react';
import GoalList from "../GoalList/GoalList";
import "./PastGoals.css"
class PastGoals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'All',
            types: ['All', ...this.props.types],
            currentGoals: [...this.props.pastGoals],
            showDelete: false,
            compacted: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props) {
            this.setState({currentGoals: [...this.props.pastGoals]})
        }
    }

    changeFilter(type){
        this.setState({type,
            currentGoals: (type !== 'All')
                ? this.props.pastGoals.filter((pg) => pg.type === type)
                : this.props.pastGoals
        })
    }

    render() {
        return (<main className='past-goals'>
            <h1>Past {(this.state.type !== 'All') ? this.state.type : ''} Goals</h1>
            <div className="addition-wrapper">
                <div className='dropdown-types'>
                    <p>{this.state.type}</p>
                    <ul className='dropdown-list'>
                        {this.state.types.map((type, i) => <li key={i}
                                                               className={(this.props.selectedType === type) ? 'tinted' : ''}
                                                               onClick={() => this.changeFilter(type)}>{type}</li>)}
                    </ul>
                </div>
                <section className='add-input'>
                    <input value={this.state.value} onChange={this.handleInput} onKeyPress={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            this.handleAdd(e);
                        }
                    }}/>
                    <div className='even-space'>
                        <button onClick={() => this.setState({value: ''})}
                                type='button'>Cancel
                        </button>
                        <button onClick={this.handleAdd} type='button'>Search</button>
                    </div>
                </section>
            </div>
            <p className='even-space' onClick={() => this.setState({showDelete: !this.state.showDelete})}>Show
                Delete
                <span>{(this.state.showDelete) ? 'Yes' : 'No'}</span></p>
            <p className='even-space' onClick={() => this.setState({compacted: !this.state.compacted})}>Compacted
                <span>{(this.state.compacted) ? 'Yes' : 'No'}</span></p>
            {(this.props.pastGoals.length === 0) ? <h2>No {this.state.type} Goals</h2> : ''}
            {(this.state.type === 'All')
                ? this.state.currentGoals.map((pg, i) => <GoalList key={i} goalId={pg.id} deleteGoal={this.props.deleteGoal}
                                                                   showChecked={false} isEditable={false} showCompleted={true}
                                                                   date={pg.date} type={pg.type} goals={pg.goals} past={true}
                                                                   showDelete={this.state.showDelete} checkedamt={pg.checkedamt}
                                                                   compacted={this.state.compacted}/>)
                : this.state.currentGoals.map((pg, i) => <GoalList key={i} goalId={pg.id} deleteGoal={this.props.deleteGoal}
                                                                   showChecked={false} isEditable={false} showCompleted={true}
                                                                   date={pg.date} showDelete={this.state.showDelete} type={pg.type}
                                                                   goals={pg.goals} past={true} checkedamt={pg.checkedamt}
                                                                   compacted={this.state.compacted}/>)
            }
            {(this.state.currentGoals.length > 0) ? '' : <h2>Currently No Past {this.state.type !== 'All' ? this.state.type : ''} Goals</h2>}
        </main>);
    }
}

export default PastGoals;