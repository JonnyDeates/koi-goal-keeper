import React, {useEffect} from 'react';
import './Home.css';
import {getCurrentThemeColors} from "../../../Utils/Utils";
// import TryPremium from "../../../Components/Checkout/TryPremium";
import {SettingsConsumer, useSetting, useTextColor} from "../Settings/SettingsContext";
import {getBgColor} from "../../../Utils/Theming";
import Table from "../../../Components/Table/Table";
import GoalList from "../../../Components/GoalList/GoalList";


function Home() {

    const theme = useSetting('theme')
    const darkmode = useSetting('dark_mode') === 1
    const nickname = useSetting('nickname')

    const bgColor = getBgColor({theme, darkmode})
    const textColor = useTextColor();
    useEffect(() => {
        document.body.style.backgroundColor = getCurrentThemeColors().pColor;

    }, [])


    const paycheck = 0

    const goalLists = [{goals: [{value: 'dank meme', checked: false}], date: new Date(), type: 'Daily'}]

    return (<SettingsConsumer>{({state, dispatch}) =>
        (<>
                <main className="content" style={{...bgColor}}>
                    <h1 style={{...bgColor}} className='title tab'>{nickname}'s Goals</h1>
                    <form>
                        <h2 className='header'>New Goal
                            <input placeholder='Paycheck' value={paycheck} className={'yeet'} id={'budget-paycheck'}
                                   onChange={e => dispatch({
                                       type: 'patchData', key: 'bd_payday',
                                       value: e.target.value
                                   })}/>

                        </h2>
                    </form>
                    <Table goals={{fire: {name: 'yeet', dueDate: '11/22/22', isCompleted: false}}} setGoals={() => {
                    }} dispatch={dispatch} color={bgColor}/>
                </main>
                {goalLists.map((goalList, i) => <GoalList key={i} goalList={goalList}/>)}
            </>
        )}

    </SettingsConsumer>)
}


export default Home;
