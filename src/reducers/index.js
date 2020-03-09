import {combineReducers} from 'redux';
import loginReducer from './LoginReducer';
import subjectReducer from './SubjectReducer';
import yearReducer from './YearReducer'

export default combineReducers({loginReducer, subjectReducer, yearReducer});
