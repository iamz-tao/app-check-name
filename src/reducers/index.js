import {combineReducers} from 'redux';
import loginReducer from './LoginReducer';
import subjectReducer from './SubjectReducer';
import yearReducer from './YearReducer'
import checknameReducer from './CheckNameReducer';

export default combineReducers({loginReducer, subjectReducer, yearReducer,checknameReducer});
