import React, {useState} from "react";
import config from "../../../../../config";
import TokenService from "../../../../../services/local/token-service";
import DeleteModal from "../../DeleteModal/DeleteModal";
import LocalDataService from "../../../../../services/local/local-storage-service";
import AuthApiService from "../../../../../services/database/auth-api-service";
import './AdvancedSettings.css'

const downloadFile = async (data) => {

    const fileName = "BudgetData";
    const json = JSON.stringify(data);
    const blob = new Blob([json], {type: 'application/json'});
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
const uploadFile = (event, callback) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = e => {
        callback(e.target.result);
    };
};


const AdvancedSettings = ({state, dispatch}) => {
    const key = config.JSON_SECRET;

    const [uploaded, setUploaded] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const buttonClassName = expanded ? 'active' : ''
    const Arrow = ({direction}) => (<span className={direction ? 'arrow-up' : 'arrow-up arrow-down'}>&#9664;</span>)
    const toggleExpanded = () => setExpanded(!expanded)
    const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal)

    const deleteData = async (event, email) => {
        event.preventDefault();
        const EmptyStorage = () => {
            TokenService.clearAuthToken();
            LocalDataService.clearAllLocalData();
            window.location.reload();
        }
        if (email)
            AuthApiService.deleteUser(email).then(EmptyStorage)
        else
            EmptyStorage();
    }
    const Data = (e) => {
        e.preventDefault();
        const budgeting = LocalDataService.getLocalData("Budgeting");
        const debt = LocalDataService.getLocalData("Debt");
        const savingGoals = LocalDataService.getLocalData("SavingGoals");
        const settings = LocalDataService.getLocalData("Settings");

        return {budgeting, debt, savingGoals, settings, key};
    }
    const onUpload = (e, dispatch) => {
        e.preventDefault();
        if (typeof uploaded !== 'string')
            return
        const upload = JSON.parse(uploaded);
        const trySaving = (data, dataStore) => {
            if (data)
                LocalDataService.saveLocalData(dataStore, JSON.parse(data))
        }
        if (upload && upload.key && upload.key === key) {
            trySaving(upload.budgeting, "Budgeting");
            trySaving(upload.debt, "Debt");
            trySaving(upload.savingGoals, "SavingGoals");
            if (upload.settings)
                dispatch({type: 'setData', value: JSON.parse(upload.settings)})
            trySaving(upload.settings, "Setting");
        }
    }

    return <div className={'advanced-settings-container'}>
        <button className={buttonClassName} onClick={toggleExpanded}>Advanced Settings<Arrow direction={expanded}/>
        </button>
        {expanded && <div className={'advanced-settings'}>
            <div className={'setting-label'}>Download:
                <button onClick={(e) => downloadFile(Data(e))}> Json</button>
            </div>
            <div className={'setting-label'}>Upload Json:
                <input type={'file'} accept=".json" onChange={(e) => uploadFile(e, setUploaded)}/>
                <button onClick={e => onUpload(e, dispatch)}>Upload</button>
            </div>
            <div className={'setting-label delete-account-button'}>
                <button onClick={toggleDeleteModal}>Delete Account</button>
            </div>
            {showDeleteModal && <DeleteModal deleteData={deleteData} closeModal={toggleDeleteModal} state={state}/>}
        </div>}
    </div>
}
export default AdvancedSettings