import React from "react";
import "./Home.css";
import {Button} from "koi-pool";
import GoalList from "../../components/GoalList/GoalList";
import GoalActions from "../../components/GoalList/actions/GoalActions";
import {useGoalListContext} from "../../contexts/GoalListProvider/GoalListProvider";
import SortControl from "./SortFilter/SortControl";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import GoalClient from "../../components/GoalList/components/Goal/clients/GoalClient";
import FilterControl from "./FilterControl/FilterControl";

function Home() {
    const {applyActionToGoalList} = useGoalListContext();

    const handleAddGoal = () => {
        GoalClient.create().then((response) => {
                applyActionToGoalList(GoalActions.create(response.data));
            }
        )
    };

    return <PageWrapper header={"Koi Goal Keeper"}>
        <div>
            <SortControl/>
            <FilterControl/>
            <div className={"AddGoal"}>
                <Button onClick={handleAddGoal} variant={'accept'}>Add Goal</Button>
            </div>
        </div>
        <GoalList/>

    </PageWrapper>
}

export default Home;