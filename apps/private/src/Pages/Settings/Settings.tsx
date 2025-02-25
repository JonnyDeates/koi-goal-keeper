import React from 'react';
import dayjs from "dayjs";
import {Button, IconButton, Select, SpacedLabel} from "koi-pool";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import {useSettings} from "../../contexts/SettingsProvider/SettingsProvider";
import UsernameInput from "./components/UsernameInput/UsernameInput";
import PasswordInput from "./components/PasswordInput/PasswordInput";
import {SELECTABLE_DUE_DATE_OPTION} from "@repo/types";
import {allSelectableDueDates} from "../../utils/utils";
import SettingsClient from "./clients/SettingsClient";
import SettingsActions from "./actions/SettingsActions";
import SelectableDueDates from "./components/SelectableDueDates/SelectableDueDates";

const Settings = () => {
    const {user, applyActionToUser} = useSettings()

    const handleSelectedDueDateUpdate = (newSelection: SELECTABLE_DUE_DATE_OPTION)=> {
        SettingsClient.updateSelectedDueDateOption(newSelection).then(()=> {
            applyActionToUser(SettingsActions.updateSelectedDueDateOption(newSelection))
        })
    }

    const dateFormat = dayjs(user.dateCreated).format("MM/DD/YYYY").toString()

    if(user)

    return (
        <PageWrapper header={"Settings"}>
            <UsernameInput/>
            <SpacedLabel label={'Email'}>
                {user.email}
            </SpacedLabel>
            <PasswordInput/>
            <SpacedLabel label={'User Since'}>
                {dateFormat}
            </SpacedLabel>
            <SpacedLabel label={'Selectable Duedates'}>
                <Select<SELECTABLE_DUE_DATE_OPTION>
                    containerAttributes={{className: 'Select'}}
                    selectedOptionAttributes={{
                        className: 'SelectedOption',
                    }}
                    options={allSelectableDueDates} optionAttributes={{}
                    // {style: ((option) => ({...ColorSelection['Default'][option]}))}
                }
                    selectedOption={user.selectedDueDate} onClick={handleSelectedDueDateUpdate}/>
            </SpacedLabel>
            <SelectableDueDates selectedDueDate={user.selectedDueDate} />
            <SpacedLabel label={'Subscribe to Email Notifications?'}>
                <IconButton src={''} alt={'checked'}/>
            </SpacedLabel>
            <Button>
                Delete Account?
            </Button>
        </PageWrapper>
    );
};
export default Settings;