import {
	CHANGE_SEARCH,
	SUBMIT_SEARCH,
	SUBMIT_SEARCH_SUCCESS,
	SUBMIT_SEARCH_ERROR,
} from '../constants/search.js';

const intialState = {
	searchbar: '',
	searchData: false,
	isFetching: false,
	searchError: false,
};


function searchReducer(state = intialState, action) {
	switch(action.type) {
		case CHANGE_SEARCH:
			return {
				...state,
				searchbar: action.payload
			}
		case SUBMIT_SEARCH:
			return {
				...state,
				searchData: false,
				isFetching: true
			}
		case SUBMIT_SEARCH_SUCCESS:
			return {
				...state,
				isFetching: false,
				searchData: action.payload
			}
		case SUBMIT_SEARCH_ERROR:
			return {
				...state,
				isFetching: false,
				searchError: action.payload,
			}
		default:
		    return state;
	}
}

export default searchReducer;