import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  SELECT_NODE,
  OPEN_MODAL,
  CLOSE_MODAL,
  SCROLLED_TO,
  SCROLLED_TO_REMOVE,
} from '../constants/ui.js';

export function scrolledTo(number) {
  return (dispatch, getState) => {
    if (getState().uiReducer.currentNumber) {
      dispatch(scrolledToRemove());
    }
    dispatch(scrolledToInit(number === 0 ? '' : number));
    setTimeout(() => {
      dispatch(scrolledToRemove());
    }, 4000);
  }
}

export function scrolledToInit(number) {
  return {
    type: SCROLLED_TO,
    payload: number,
  };
}

export function scrolledToRemove() {
  return {
    type: SCROLLED_TO_REMOVE,
  }
}

export function openModal() {
  return {
    type: OPEN_MODAL,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}

export function openSidebar() {
  return {
    type: OPEN_SIDEBAR,
  }
}

export function closeSidebar() {
  return {
    type: CLOSE_SIDEBAR,
  }
}

export function selectNode(id) {
  return {
    type: SELECT_NODE,
    payload: id,
  }
}