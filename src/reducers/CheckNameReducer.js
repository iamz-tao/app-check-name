import {CHECKNAME,CHECKNAME_SUCCESS,CHECKNAME_FAILURE} from '../constant'

const initialState = {
    data: [],
    err_message: '',
    ischecking: false,
    isError: false,
    status:false,
    timecheck : ''
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case CHECKNAME:
        return {...state, ischecking: true, data: [],timecheck:''};
  
      case CHECKNAME_SUCCESS: {
         const data = JSON.parse(action.payload);
         console.log(data)
        return {
          ...state,
          isLogin: false,
          fetching: false,
          status:'SUCCESS',
          timecheck:data.dateTime
        //   data: data.data,
        //   status: 'SUCCESS',
        };
      }
  
      case CHECKNAME_FAILURE:
        // const data = JSON.parse(action.payload)
        // console.log(action.payload)
        return {...state, isError: true, err_message: data.message, status: 'FAILURE'};
  
      default:
        return state;
    }
  };