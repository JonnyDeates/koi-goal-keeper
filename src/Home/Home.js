import React from 'react';
import './Home.css';
import GoalList from '../GoalList/GoalList'
import cuid from 'cuid'

class Home extends React.Component {

    constructor(props) {
        super(props);
        let testDate = new Date();
        testDate.setDate(testDate.getDate() + 7);
        this.state = {
            allGoals: [{
                type: 'Daily',
                goals: [{goal: 'Yes', id: cuid(), checked: false}, {goal: 'Yeet', id: cuid(), checked: false}, {
                    goal: 'How it goes',
                    id: cuid(),
                    checked: false
                }],
                date: new Date().toISOString()
            }, {
                type: 'Weekly',
                goals: [{goal: 'Cool', id: cuid(),checked: false}, {goal: 'Dope', id: cuid(),checked: false}],
                date: testDate.toISOString()
            }]
        }
    }

    render() {
        return (
            <div>
                <h1>{'.'}</h1>
                <h1>Current Goals</h1>
                {this.state.allGoals.map((Goal, i) => <GoalList key={i} showCompleted={true} goals={Goal.goals} type={Goal.type} date={Goal.date}/>)}
            </div>
        )
    }
}

export default Home;