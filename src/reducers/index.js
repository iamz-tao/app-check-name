import {combineReducers} from 'redux';
import loginReducer from './LoginReducer';
import subjectReducer from './SubjectReducer';

export default combineReducers({loginReducer, subjectReducer});
