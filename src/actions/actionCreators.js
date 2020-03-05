import client from "../http";
import {
  GALLERY_FETCH_REQUEST,
  GALLERY_FETCH_SUCCESS,
  GALLERY_FETCH_FAILURE,
  MEDIA_DELETE_SUCCESS,
  MEDIA_DELETE_FAILURE,
  MEDIA_DELETE_REQUEST,
  MEDIA_SAVE_FAILURE,
  MEDIA_SAVE_SUCCESS,
  MEDIA_SAVE_REQUEST,
  GALLERY_PLAY_ITEM
} from "./actionTypes";

export const playItem = item => {
  return { type: GALLERY_PLAY_ITEM, payload: { item } };
};
export const galleryItemsListFetchRequest = () => {
  return {
    type: GALLERY_FETCH_REQUEST,
    payload: {}
  };
};
export const galleryItemsListFetchSuccess = items => {
  return {
    type: GALLERY_FETCH_SUCCESS,
    payload: { items }
  };
};
export const galleryItemsListFetchFailure = error => {
  return {
    type: GALLERY_FETCH_FAILURE,
    payload: { error }
  };
};
export const galleryItemsListFetch = () => async dispatch => {
  dispatch(galleryItemsListFetchRequest());
  try {
    const { data } = await client.get("/media");

    dispatch(galleryItemsListFetchSuccess(data));
  } catch (e) {
    dispatch(galleryItemsListFetchFailure(e));
  }
};

export const galleryItemUploadRequest = () => {
  return { type: MEDIA_SAVE_REQUEST, payload: {} };
};
export const galleryItemUploadSuccsess = item => {
  return { type: MEDIA_SAVE_SUCCESS, payload: { item } };
};
export const galleryItemUploadFailure = error => {
  return { type: MEDIA_SAVE_FAILURE, payload: { error } };
};
export const galleryItemUpload = file => async dispatch => {
  dispatch(galleryItemUploadRequest());
  try {
    const data = new FormData();
    data.append("media", file, file.name);
    await client.post("/upload", data);

    dispatch(galleryItemUploadSuccsess());
    dispatch(galleryItemsListFetch(data));
  } catch (e) {
    dispatch(galleryItemUploadFailure(e));
  }
};

export const removeItemRequest = () => {
  return { type: MEDIA_DELETE_REQUEST, payload: {} };
};
export const removeItemSuccses = id => {
  return { type: MEDIA_DELETE_SUCCESS, payload: { id } };
};
export const removeItemFailure = error => {
  return { type: MEDIA_DELETE_FAILURE, payload: { error } };
};

export const removeItem = item => async dispatch => {
  dispatch(removeItemFailure());

  try {
    const id = item.id;

    const response = await client.delete(`/media/${id}`);
    console.log(response);

    dispatch(removeItemSuccses(id));
  } catch (error) {
    dispatch(removeItemFailure(error));
  }
};
