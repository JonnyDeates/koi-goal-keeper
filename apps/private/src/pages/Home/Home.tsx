import React, {useState} from "react";
import "./LandingPage.css";
import {Button} from "koi-pool";
import AuthenticationClient from "../../clients/AuthenticationClient";
import {buildGoal} from "../../utils/builders/buildGoal";
import GoalList, {GoalListType} from "../../components/GoalList/GoalList";
import cuid2 from "@paralleldrive/cuid2";
import GoalActions from "../../components/GoalList/actions/GoalActions";
import {useGoalListContext} from "../../contexts/GoalListProvider";



const Home = () => {
    const {applyActionToGoalList} = useGoalListContext();
        const handleAddGoal = () => {
            applyActionToGoalList(GoalActions.createNewGoal)
        }

        return <main className={"LandingPage"}>
            <h1>Koi Goal Keeper Logged In</h1>
            <Button onClick={handleAddGoal}>Add Goal</Button>
            <GoalList/>

            <div className={'links'}>
                <Button variant={'accept'}
                        onClick={AuthenticationClient.handleLogout}
                >
                    Logout
                </Button>
            </div>
        </main>;
    }
;
export default Home;