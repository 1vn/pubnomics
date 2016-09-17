import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  SELECT_NODE,
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../constants/ui.js';

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