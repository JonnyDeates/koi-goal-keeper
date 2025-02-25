import {allDueDates, allDueDatesOfSelectedOption, ColorSelection} from "../../../../utils/utils";
import React from "react";
import {DUE_DATE, SELECTABLE_DUE_DATE_OPTION} from "@repo/types";
import './SelectableDueDates.css'
type SelectableDueDatesProps = {
    selectedDueDate: SELECTABLE_DUE_DATE_OPTION
}

const SelectableDueDates = ({selectedDueDate}: SelectableDueDatesProps) => {
    const availableSelectedDueDates = [DUE_DATE.LATE, ...allDueDatesOfSelectedOption(selectedDueDate), DUE_DATE.FAR_FUTURE]

    return <div className={'SelectableDueDates'}>
        {allDueDates().map((x) =>
            <span
                key={'SelectedDueDatesDisplayed' + x}
                style={availableSelectedDueDates.includes(x) ? ColorSelection["Default"][x] : {
                    backgroundColor: 'gray',
                    color: 'lightgray'
                }}>
                    {x}
                </span>)}
    </div>
}
export default SelectableDueDates