import { combineReducers } from "redux";
import {
  GALLERY_FETCH_REQUEST,
  GALLERY_FETCH_SUCCESS,
  GALLERY_FETCH_FAILURE,
  MEDIA_DELETE_REQUEST,
  MEDIA_DELETE_SUCCESS,
  MEDIA_DELETE_FAILURE,
  MEDIA_SAVE_REQUEST,
  MEDIA_SAVE_SUCCESS,
  GALLERY_PLAY_ITEM
} from "../actions/actionTypes";

const initialListState = {
  items: [],
  loading: false,
  error: null,
  played: null
};

export function galleryItemsListReducer(state = initialListState, action) {
  switch (action.type) {
    case GALLERY_FETCH_REQUEST:
      return { ...state, loading: true, error: null };
    case GALLERY_FETCH_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
        loading: false,
        error: null
      };
    case GALLERY_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case GALLERY_PLAY_ITEM:
      return { ...state, played: action.payload.item };
    case MEDIA_DELETE_SUCCESS:
      const { id } = action.payload;
      return {
        ...state,
        items: [...state.items.filter(o => o.id !== id)],
        loading: false,
        error: null
      };
    default:
      return state;
  }
}

const initialEditState = {
  item: null,
  loading: false,
  error: null
};

export function galleryItemEditReducer(state = initialEditState, action) {
  switch (action.type) {
    case MEDIA_SAVE_REQUEST:
      return { ...state, item: null, loading: true, error: null };
    case MEDIA_SAVE_SUCCESS:
      return {
        ...state,
        item: action.payload.item,
        loading: false,
        error: null
      };
    case MEDIA_DELETE_FAILURE:
      return {
        ...state,
        item: null,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
const initialRemoveState = {
  id: -1,
  loading: true,
  error: null
};
export function galleryItemRemoveReducer(state = initialRemoveState, action) {
  switch (action.type) {
    case MEDIA_DELETE_REQUEST:
      return { ...state, id: -1, loading: true, error: null };
    case MEDIA_DELETE_SUCCESS:
      return { ...state, id: action.payload.id, loading: false, error: null };
    case MEDIA_DELETE_FAILURE:
      return { ...state, id: -1, loading: false, error: action.payload.error };

    default:
      return state;
  }
}

const galleryReducer = combineReducers({
  list: galleryItemsListReducer,
  edit: galleryItemEditReducer,
  remove: galleryItemRemoveReducer
});

export default galleryReducer;
