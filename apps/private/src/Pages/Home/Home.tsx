import React from "react";
import "./Home.css";
import {Button} from "koi-pool";
import GoalList from "../../components/GoalList/GoalList";
import GoalActions from "../../components/GoalList/actions/GoalActions";
import {useGoalListContext} from "../../contexts/GoalListProvider/GoalListProvider";
import SortFilter from "../../components/SortFilter/SortFilter";
import PageWrapper from "../../components/PageWrapper/PageWrapper";


function Home() {
  const {applyActionToGoalList} = useGoalListContext();
  const handleAddGoal = () => {
    applyActionToGoalList(GoalActions.create);
  };

  return <PageWrapper header={"Koi Goal Keeper Logged In"}>
    <div>
      <SortFilter/>
      <Button onClick={handleAddGoal}>Add Goal</Button>
    </div>
    <GoalList/>

  </PageWrapper>
}

export default Home;