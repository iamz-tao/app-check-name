import { CHECKNAME, CHECKNAME_SUCCESS, CHECKNAME_FAILURE } from '../constant';

const  initialState = {
    error:'',
    data:''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHECKNAME: {
            return { ...state }
        }
        case CHECKNAME_SUCCESS:
            return { ...state, fetching: true, currentYear: [] };

        case CHECKNAME_FAILURE: {
            const data = JSON.parse(action.payload);
            return {
                ...state,
                fetching: false,
                currentYear: data.data,
                status: 'SUCCESS',
            };
        }

        default:
            return state;
    }
};