import {GET_CLASS_CHECK_NAME, SET_CLASS_CHECK_NAME,CHECKNAME_SUCCESS,CHECKNAME_FAILURE,CHECKNAME} from '../constant';

const initialState = {
  error: [],
  openingClass: null,
  status: '',
  fetching: false,
  time_check: '',
  error_message : '',
  ischecking : false,
  data : []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASS_CHECK_NAME:
      return {...state, fetching: true};

    case SET_CLASS_CHECK_NAME: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, openingClass: data.data};
    }

    case CHECKNAME: {
      return {...state,ischecking : true ,data:[]}
    }

    case CHECKNAME_SUCCESS: {
      return {...state,ischecking:false,data: action.payload,status:"SUCCESS"}
    }

    case CHECKNAME_FAILURE : {
      return {...state,ischecking:false,error_message:action.payload,status:"FAILURE"}
    }


    default:
      return state;
  }
};
