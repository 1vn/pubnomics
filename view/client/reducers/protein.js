import {
	PICK_INITIAL,
	PICK_RESULT
} from '../constants/protein';

const initialState = {
	currentlyClicked: false,
	resultClicked: false
}

function proteinReducer(state = initialState, action) {
	switch(action.type) {
		case PICK_INITIAL:
			return {
				...state,
				currentlyClicked: action.payload
			}
		case PICK_RESULT:
			return {
				...state,
				resultClicked: action.payload
			}
		default:
			return state;
	}
}

export default proteinReducer;