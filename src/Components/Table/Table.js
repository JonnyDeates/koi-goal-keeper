import React, {useState} from 'react';
import plus from "../../assets/icons/plus.svg"
import trash from "../../assets/icons/trash.svg";
import {EmptyCell, ErrorRow, RenderRow, RenderRowExtended, rowStyle} from "./TableUtils";
import {InputCheckBox, InputText} from "../Input/Input";
import CircleButton from "../GoalList/GoalItem/CircleButton/CircleButton";

// The Table for Goals
const Table = ({goals, setGoals, dispatch, isDeletable, isEditable, color}) => {

    const NeedsHeaders = isDeletable ? ['Goal','Due Date', 'Complete?', '']:  ['Goal','Due Date', 'Complete?'];
    const NeedsHeadersTitles =  ['','',''];
    const NeedsHeadersFunctions =  [false, false, false, false, false]

    // Error Messaging
    const [error, setError]= useState("");

    // The Header Row
    const HeaderRow = () => <RenderRow array={NeedsHeaders} arrayTitles={NeedsHeadersTitles} row={'row-headers'} arrayFunctions={NeedsHeadersFunctions}/>
    // The Row to Add rows of Needs to the table
    // const AddNeed = () => {
    //     const [goal, setGoal] = useState('')
    //     const [needPrice, setPrice] = useState(0)
    //     const RowStyle = rowStyle(goals.length)
    //
    //     const addItem = (e) => {
    //         e.preventDefault()
    //         const trimmedGoal = goal.trim();
    //         try{
    //             setGoals({type:'addNeed', value: {name: trimmedGoal, date: needPrice, isCompleted: true }});
    //             setGoal("");
    //             setPrice(0);
    //             setError("")
    //         } catch (e){
    //             setError(e.message);
    //         }
    //     };
    //     return <form className='row' style={RowStyle} onSubmit={addItem}>
    //         <InputText placeholder='Goal' value={goal} onChange={e => setGoal(e.target.value)}/>
    //         {/*<InputNumber placeholder='Price' value={needPrice} onChange={e => setPrice(validateFloat(parseFloat(e.target.value),0))}/>*/}
    //         <EmptyCell/>
    //         <EmptyCell/>
    //         <div className='cell'><button className="addButton" type='submit'><img src={plus} alt={'+'} /></button></div>
    //         {isDeletable && <EmptyCell/>}
    //     </form>
    // }
    // The Row for rending a Need
    const RenderGoal = (id, i) => {
        const item = goals[id];

        if(item.name === undefined)
            return <></>;
        const {name, dueDate, isCompleted} = item;
        const RowStyle = rowStyle(i+1);

        const RemoveButton = () => isDeletable && <div className='cell'><button className='deleteButton' onClick={()=> setGoals({type: "removeNeed", id})}><img src={trash} alt={'del'} /></button></div>

        const NeedsToggledInput = () => <InputCheckBox value={!isCompleted} onChange={() =>{
            setGoals({type: 'updateNeedValue', id, value: !isCompleted, colIndex: 'isOn'});
            dispatch({type: 'patchData', key: 'goal', value: false})
        }
        }
        />


        return isEditable ? <form key={id} className='row' style={RowStyle}>
                <InputText placeholder='Name' value={name} onChange={e => setGoals({type: 'updateNeedValue', id, value: e.target.value, colIndex: 'name'})}/>
                <div className='cell'>{dueDate}</div>
                <NeedsToggledInput/>
                <RemoveButton/>
            </form>
            : <RenderRowExtended key={id} array={[name, dueDate]} rowStyle={RowStyle}>
                <NeedsToggledInput/>
                <RemoveButton/>
                <CircleButton isEditing/>
            </RenderRowExtended>
    }
    const goalsArray = Object.keys(goals);
    // const sort = useSetting('sort')
    // const sortDir =  useSetting('dir')
    // Sorts the Data based on the sortment checked
    // const sortedKeys = sortBudgetData(dataArray, {sort , sortDir},Data.needs, 'price');



    // The Table
    return <div className='container' style={{backgroundColor: color}}>
        <HeaderRow/>
        {goalsArray.map((id, i) => RenderGoal(id,i-1))}
        <ErrorRow error={error}/>
        {/*{AddNeed()}*/}
    </div>
}
export default Table;