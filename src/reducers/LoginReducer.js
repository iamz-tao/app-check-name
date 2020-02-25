import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constrant'

const initialState = {
    data: [],
    isLogin: false,
    err: [],
    isError: false

}

export default (state = initialState, action) => {
    switch (action.type) {

        case LOGIN:
            return { ...state, isLogin: true,data:[]};

        case LOGIN_SUCCESS:
            return { ...state, isLogin: false, data: action.payload }

        case LOGIN_FAILURE:
            return { ...state, isError: true ,err:action.payload}

        default:
            return state
    }
};
