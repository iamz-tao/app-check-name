import {GET_CLASS_CHECK_NAME, SET_CLASS_CHECK_NAME,CHECKNAME_FAILURE,CHECKNAME_SUCCESS,CHECKNAME,GET_BEACON_IN_CLASS,GET_BEACON_IN_CLASS_SUCCESS,GET_BEACON_IN_CLASS_FAILURE} from '../constant';

const initialState = {
  error: [],
  openingClass: null,
  status: '',
  fetching: false,
  time_check: '',
  error_message : '',
  ischecking : false,
  data : [],
  beacon : null,
  statusCheckin : ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASS_CHECK_NAME:
      return {...state, fetching: true};

    case SET_CLASS_CHECK_NAME: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, openingClass: data.data};
    }
    
    case CHECKNAME : {
      return {...state,ischecking : true , data : [],status:''}
    }

    case CHECKNAME_SUCCESS : {
      const data = JSON.parse(action.payload);
      return {...state,ischecking:false,time_check:data.dateTime,statusCheckin : data.statusCheckIn,status:"SUCCESS"}
    }

    case CHECKNAME_FAILURE : {
      console.log("CHECKNAME_FAILURE")
      const data = JSON.parse(action.payload);
      return {...state,ischecking:false,error_message: data.message,status:"FAILURE"}
    }
    
    case GET_BEACON_IN_CLASS : {
      return {...state,beacon: []}
    }

    case GET_BEACON_IN_CLASS_SUCCESS:{
      return {...state,beacon : action.payload, status:"SUCCESS"}
    }

    case GET_BEACON_IN_CLASS_FAILURE : {
      return {...state, status : "FAILURE"}
    }
    
    default:
      return state;
  }
};