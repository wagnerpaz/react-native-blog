import {useReducer} from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (blogPosts, action) => {
    switch(action.type) {
        case 'get_blogposts':
            return action.payload;
        case 'delete_blogpost':
            return blogPosts.filter(blogPost => blogPost.id !== action.payload);
        case 'edit_blogpost':
            return blogPosts.map((blogPost) => blogPost.id === action.payload.id ? action.payload : blogPost)
        default:
            return blogPosts;
    }
}

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        dispatch({type: 'get_blogposts', payload: response.data});
    };
};

const addBlogPost = dispatch => {
    return async (title, content, callback = () => {}) => {
        await jsonServer.post('/blogposts', {
            title,
            content,
        });
        callback();
    };
};

const deleteBlogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({type: 'delete_blogpost', payload: id});
    };
};

const editBlogPost = displatch => {
    return async (id, title, content, callback = () => {}) => {
        await jsonServer.put(`/blogposts/${id}`, {title, content});
        displatch({type: 'edit_blogpost', payload: {id, title, content}});
        callback();
    };
};

export const {Context, Provider} = createDataContext(blogReducer, {
    getBlogPosts,
    addBlogPost,
    deleteBlogPost,
    editBlogPost,
}, []);