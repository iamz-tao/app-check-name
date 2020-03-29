import {CHECKNAME,CHECKNAME_SUCCESS,CHECKNAME_FAILURE} from '../constant'

const initialState = {
    data: [],
    err: '',
    ischecking: false,
    isError: false,
    status:false
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case CHECKNAME:
        return {...state, ischecking: true, data: []};
  
      case CHECKNAME_SUCCESS: {
         const data = JSON.parse(action.payload);
         console.log(data)
        return {
          ...state,
          isLogin: false,
          fetching: false,
          status:'SUCCESS',
        //   data: data.data,
        //   status: 'SUCCESS',
        };
      }
  
      case CHECKNAME_FAILURE:
        return {...state, isError: true, err: action.payload, status: 'FAILURE'};
  
      default:
        return state;
    }
  };