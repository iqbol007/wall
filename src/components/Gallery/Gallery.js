import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { galleryItemsListFetch } from '../../actions/actionCreators';
import GalleryItemsList from '../../GalleryItemsList/GalleryItemsList';
import GalleryAddItemForm from '../GalleryAddItemForm/GalleryAddItemForm';
export default function Gallery() {
    const state = useSelector(state => state.gallery.list);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(galleryItemsListFetch());
    }, [dispatch]);

    return (
        <>  
            <GalleryAddItemForm />
            <GalleryItemsList {...state} />
        </>
    )
}
