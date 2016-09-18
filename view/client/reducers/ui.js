import {
   OPEN_SIDEBAR,
   CLOSE_SIDEBAR,
   SELECT_NODE,
   OPEN_MODAL,
   CLOSE_MODAL,
   SCROLLED_TO,
   SCROLLED_TO_REMOVE,
} from '../constants/ui.js';
import randomcolor from 'randomColor';


const initialState = {
  isSidebarOpen: false,
  isModalOpen: false,
  selectedNode: false,
  colorMapping: randomcolor({
    count: 20,
    hue: 'green',
  }),
  colorMappingArray: [
    'Ala', 'Arg', 'Asn', 'Asp', 'Cys', 'Gln', 'Glu', 'Gly', 'His', 'Ile', 'Leu', 'Lys', 'Met', 'Phe', 'Pro', 'Ser', 'Thr', 'Trp', 'Tyr', 'Val'
  ],
  noMappingColor: 'rgb(125, 237, 186)',
  currentNumber: false
};

function uiReducer(state = initialState, action) {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      }
    case OPEN_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: true,
      }
    case CLOSE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: false,
      }
    case SELECT_NODE:
      return {
        ...state,
        selectedNode: action.payload,
      }
    case SCROLLED_TO:
      return {
        ...state,
        currentNumber: action.payload
      }
    case SCROLLED_TO_REMOVE:
      return {
        ...state,
        currentNumber: false
      }
    default: 
      return state;
  }
}

export default uiReducer;