import React from "react";
import "./Home.css";
import {Button} from "koi-pool";
import GoalList from "../../components/GoalList/GoalList";
import GoalActions from "../../components/GoalList/actions/GoalActions";
import {useGoalListContext} from "../../contexts/GoalListProvider";


const Home = () => {
    const {applyActionToGoalList} = useGoalListContext();
    const handleAddGoal = () => {
      applyActionToGoalList(GoalActions.create)
    };

    return <main className={"Home"}>
      <h1>Koi Goal Keeper Logged In</h1>
      <div>
        <Button onClick={handleAddGoal}>Add Goal</Button>
      </div>
      <GoalList/>
    </main>;
  }
;
export default Home;