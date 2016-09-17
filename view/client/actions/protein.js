import {
	PICK_INITIAL,
	PICK_RESULT,
} from '../constants/protein.js';
import {
	closeModal,
	openSidebar,
	selectNode,
} from './ui.js';
import {
	changeSearchPost,
	submitSearch
} from './search.js';

export function pickInitial(id, data) {
	return {
		type: PICK_INITIAL,
		payload: {
			id,
			data,
		},
	};
}

export function pickResultData(data) {
	return {
		type: PICK_RESULT,
		payload: data,
	};
}

export function pickResult(data) {
	return (dispatch, getState) => {
		dispatch(closeModal());
		dispatch(pickResultData(data));
		const previousPickedData = getState().proteinReducer.currentlyClicked;
		dispatch(changeSearchPost(null, 'p.' + previousPickedData.data + previousPickedData.id + data));
		dispatch(selectNode(previousPickedData.id));
		dispatch(submitSearch('p.' + previousPickedData.data + previousPickedData.id + data));
		dispatch(openSidebar());
	}
}
