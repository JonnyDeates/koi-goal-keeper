import React from 'react';
import './GoalList.css'
import './Compacted.css'
import GoalItem from "./GoalItem/GoalItem";
import {getColor, getCurrentThemeColors} from '../../Utils/Utils';
import {useSetting} from "../../Pages/PrivateRoutes/Settings/SettingsContext";

const pushIco = require("../../assets/icons/push.svg");
const addIco = require("../../assets/icons/plus.svg");
const copyIcon = require("../../assets/icons/copy.svg");
const trashIco = require("../../assets/icons/trash.svg");

const GoalList = ({goalList, isPast}) => {

    const {goals, type, date} = goalList


    const compacted = useSetting('compacted')
    const isDeletable = useSetting('show_delete') === "0"
    const checkedAmt = 0
    const formattedDate = new Date(date).toLocaleDateString()
    let completed = checkedAmt === goals.length;
    let checked = checkedAmt >= 1;

    const handleDeleteGoalList = () => {

    }

    const handleCloneGoalList = () => {

    }

    const GoalListTitle = () => {
        return <div className={'goal-list-title'}
                    style={{backgroundColor: getCurrentThemeColors().tColor, color: getCurrentThemeColors().fontColor}}>
            <p>{type}</p>
            <p style={{backgroundColor: getCurrentThemeColors().tColor}}>{formattedDate}</p>

            {isDeletable
            && <img className="goal-list-trash" src={trashIco} alt='Delete Goal-list' title="Delete All Objectives"
                    style={getColor(type)} onClick={handleDeleteGoalList}/>}
            <img className="goal-list-clone" src={copyIcon} alt='Clone Goal-list' title="Clone All Objectives"
                 style={getColor(type)} onClick={handleCloneGoalList}/>
            <div className="circle-indicator-wrapper">
                <div className='circle-indicator' style={getColor(type)}/>
            </div>
        </div>
    }

    const handleArchiveGoalList = () => {

    }

    const ArchiveGoalList = () => {
        return goals !== 0 && (checked && !isPast) &&
            <img src={pushIco} alt="Push Goals" title={'Archive Goal'} className={'goal-list-push'}
                 style={{
                     backgroundColor: completed ? getColor(type).backgroundColor : getCurrentThemeColors().tColor + '66',
                     animation: completed ? '1s ease infinite pulse' : '',
                 }}
                 onClick={handleArchiveGoalList}/>
    }

    const GoalListCount = () => {
        return ( (goals.length > 1 || compacted !== 'Ultra Compacted') && checked) &&
            <p className={'goal-list-count'} style={{
                backgroundColor: getColor(type).backgroundColor,
                color: getCurrentThemeColors().headerColor
            }}>{checkedAmt}
                {(compacted === 'Ultra-Compacted') && ('/' +  goals.length)}
            </p>
    }

    const AddNewGoal = () => {

    }

    const AddGoal = () => {
        return !isPast &&
            <button className={'add-button'} onClick={AddNewGoal}
                    style={{
                        backgroundColor: getCurrentThemeColors().tColor + '66',
                        color: getCurrentThemeColors().headerColor
                    }}>
                <img src={addIco} alt={'+'} width={'20px'} height={'20px'}/>
            </button>
    }
    const Goals = () => {
        return <ul>
            {goals.map((goal, i) => <GoalItem key={i} goal={goal} isPast={isPast} isDeletable={isDeletable} compacted={compacted}/>)}
        </ul>
    }

    return (
        <div className={compacted + " goal-list"}>
            <GoalListTitle/>
            <ArchiveGoalList/>
            <GoalListCount/>
            <Goals/>
            <AddGoal/>
        </div>
    );
}
export default GoalList