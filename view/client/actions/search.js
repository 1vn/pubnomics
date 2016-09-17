import {
	CHANGE_SEARCH,
	SUBMIT_SEARCH,
	SUBMIT_SEARCH_SUCCESS,
	SUBMIT_SEARCH_ERROR,
} from '../constants/search.js';
import {
	closeSidebar
} from './ui.js';

import axios from 'axios';

export function changeSearchPost(e, alt) {
	return {
		type: CHANGE_SEARCH,
		payload: (e && e.target.value) || alt,
	}
}

export function changeSearch(e) {
	return (dispatch) => {
		dispatch(closeSidebar());
		dispatch(changeSearchPost(e));
	}
}

function submitSearchInit() {
	return {
		type: SUBMIT_SEARCH,
	}
}

function submitSearchSuccess(data) {
	return {
		type: SUBMIT_SEARCH_SUCCESS,
		payload: data
	}
}

function submitSearchError(error) {
	return {
		type: SUBMIT_SEARCH_ERROR,
		payload: error
	}
}

export function submitSearch(searchValue) {
	return (dispatch) => {
		dispatch(submitSearchInit());
		axios({
			method: 'GET',
			url: 'http://104.198.1.85:3389/',
			params: {
				v: searchValue
			}
		})
		.then((data) => {
			dispatch(submitSearchSuccess(data.data));
		})
		.catch((err) => {
			console.log(err);
			dispatch(submitSearchError(err));
		})
	}
}
