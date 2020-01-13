import {useReducer} from 'react';

import createDataContext from './createDataContext';
import { State } from 'react-native-gesture-handler';

const blogReducer = (blogPosts, action) => {
    switch(action.type) {
        case 'add_blogpost':
            return [...blogPosts, {id: Math.floor(Math.random() * 9999), title: action.payload.title, content: action.payload.content}];
        case 'delete_blogpost':
            return blogPosts.filter(blogPost => blogPost.id !== action.payload);
        case 'edit_blogpost':
            return blogPosts.map((blogPost) => blogPost.id === action.payload.id ? action.payload : blogPost)
        default:
            return blogPosts;
    }
}

const addBlogPost = (dispatch) => {
    return (title, content, callback = () => {}) => {
        dispatch({type: 'add_blogpost', payload: {title, content}});
        callback();
    };
};

const deleteBlogPost = (dispatch) => {
    return (id) => {
        dispatch({type: 'delete_blogpost', payload: id});
    };
};

const editBlogPost = (displatch) => {
    return (id, title, content, callback = () => {}) => {
        displatch({type: 'edit_blogpost', payload: {id, title, content}});
        callback();
    };
};

export const {Context, Provider} = createDataContext(blogReducer, {
    addBlogPost,
    deleteBlogPost,
    editBlogPost,
}, [
    {title: 'Example Title', content: 'Example Content', id: 1},
]);