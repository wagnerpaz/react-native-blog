import {useReducer} from 'react';

import createDataContext from './createDataContext';

const blogReducer = (blogPosts, action) => {
    switch(action.type) {
        case 'add_blogpost':
            return [...blogPosts, {title: `Blog Post #${blogPosts.length + 1}`}];
        default:
            return blogPosts;
    }
}

const addBlogPost = (dispatch) => {
    return () => {
        dispatch({type: 'add_blogpost'});
    };
};

export const {Context, Provider} = createDataContext(blogReducer, {addBlogPost}, []);