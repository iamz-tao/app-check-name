import {combineReducers} from 'redux';
import loginReducer from './LoginReducer';
import subjectReducer from './SubjectReducer';
import yearReducer from './YearReducer'
import teachHistoryReducer from './TeachHistoryReducer';
import profileReducer from './ProfileReducer';
import checkNameReducer from './CheckNameReducer';

export default combineReducers({
    loginReducer, 
    subjectReducer, 
    yearReducer,
    teachHistoryReducer,
    profileReducer,
    checkNameReducer,
});
