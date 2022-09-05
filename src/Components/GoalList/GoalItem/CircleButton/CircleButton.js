import React from 'react';
import "./CircleButton.css"
import plus from '../../../../assets/icons/plus.svg'
import edit from '../../../../assets/icons/pencil.svg'
import copy from '../../../../assets/icons/copy.svg'
import trash from '../../../../assets/icons/trash.svg'


const CircleButton = ({isPast, isEditing, isDeleting, toggleEdit, handleClone, handleRemove}) => {
    if (isPast) {
        if (isDeleting) {
            return (<div className="circle-outer">
                <ul className='circle-split'>
                    <li>
                        <div className="circle-button-content first">
                            <img onClick={handleClone} alt={'copy'} src={copy}/>
                        </div>
                        <div className="background"/>
                    </li>
                    <li>
                        <div className="circle-button-content second">
                            <img onClick={handleRemove} alt={'copy'} src={trash}/>
                        </div>
                        <div className="background"/>
                    </li>
                </ul>
            </div>)
        }

        return (<div className="circle-outer">
            <div className='circle'>
                <img onClick={handleClone} alt={'copy'} src={copy}/>
                <div className="background"/>
            </div>
        </div>)
    }

    return (
        <div className="circle-outer">
            <ul className={isDeleting ? 'circle' : 'circle-split'}>
                <li>
                    <div className="circle-button-content first">
                        <img onClick={toggleEdit} alt='edit' src={isEditing ? plus : edit }/>
                    </div>
                    <div className="background"/>
                </li>
                <li>
                    <div className="circle-button-content second">
                        <img onClick={handleClone} alt={'copy'} src={copy}/>
                    </div>
                    <div className="background"/>
                </li>
                {isDeleting && <li>
                    <div className="circle-button-content third">
                        <img onClick={handleRemove} alt={'delete'} src={trash}/>
                    </div>
                    <div className="background"/>
                </li>}
            </ul>
        </div>)
}

export default CircleButton;

