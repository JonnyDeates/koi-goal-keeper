import React, {useState} from 'react';
import CircleButton from "./CircleButton/CircleButton";
import plus from '../../../assets/icons/plus.svg'
import trash from '../../../assets/icons/trash.svg'
import edit from '../../../assets/icons/pencil.svg'
import copy from '../../../assets/icons/copy.svg'

const GoalItem = ({goal, compacted, isDeletable, isPast}) => {
    const {checked, value} = goal;

    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing(!isEditing)

    const [newValue, setNewValue] = useState()
    const handleNewValue = (e) => setNewValue(e.target.value)
    const submitEdit = () => {
        toggleEdit()
    }

    const handleChecked = () => {

    }

    const CheckBox = () => {
        if (isPast) {
            return (checked) ? <h6>Completed</h6> : <h6>Unchecked</h6>
        }
        return <input className="checkboxinput" type='checkbox'
                      onChange={handleChecked}
                      checked={checked}/>
    }

    const GoalText = () => {
        if (isPast)
            return <p>{value}</p>

        if (isEditing)
            return <input type="text" className="textinput" onChange={handleNewValue} value={newValue}
                          onKeyPress={e => {
                              if (e.key === 'Enter') {
                                  e.preventDefault();
                                  toggleEdit();
                              }
                          }}
            />
        return <p onDoubleClick={toggleEdit}>{value}</p>
    }

    const handleObjectiveClone = () => {

    }
    const handleObjectiveDelete = () => {

    }

    const GoalControls = () => {
        if (compacted === 'No') {
            return <CircleButton isEditing={isEditing} isDeleting={isDeletable} handleClone={handleObjectiveClone} handleRemove={handleObjectiveDelete} toggleEdit={toggleEdit}/>
        }
        return <div className={'row-buttons'}>
            {(!isPast) && <img onClick={toggleEdit} alt={'edit'} src={(isEditing) ? plus : edit}/>}
            <img onClick={handleObjectiveClone} alt={'copy'}
                 src={copy}/>
            {(isDeletable) && <img
                onClick={handleObjectiveDelete}
                alt={'copy'} src={trash}/>}
        </div>
    }

    return (
        <li className='goal-list-item'>
            <CheckBox/>
            <GoalText/>
            <GoalControls/>
        </li>
    );
}

export default GoalItem;

