import createDataContext from './createDataContext'

import jsonServer from '../api/jsonServer'

// USING AUTOMATED CONTEXT

// ===== REDUCERS
const blogReducer = (state, action) => {

    if (action.type == 'get_blogposts') {
        return action.payload;
    }

    if (action.type == 'update_blogpost') {
        return state.map((blogPosts) => {
            if (blogPosts.id === action.payload.id) {
                return action.payload;
            }
            return blogPosts;
        })
    }

    if (action.type == 'delete_blogpost') {
        return state.filter((x) => x.id !== action.payload);
    }

    return state
};

// ===== DISPATCH
const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        dispatch({ type: 'get_blogposts', payload: response.data })
    };
};

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', { title, content });

        if (callback) {
            callback();
        }
    };
}

const deleteBlogPost = (dispatch) => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`)

        // dispatch({ type: 'delete_blogpost', payload: id })
        const response = await jsonServer.get('/blogposts');
        dispatch({ type: 'get_blogposts', payload: response.data })
    }
}

const updateBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content })
        // dispatch({ type: 'update_blogpost', payload: { id: id, title: title, content: content } })
        
        const response = await jsonServer.get('/blogposts');
        dispatch({ type: 'get_blogposts', payload: response.data })
        if (callback) {
            callback();
        }
    }
}

const generateRandomId = () => {
    //update to check if the generate id is already present
    return Math.floor(Math.random() * 99999);
}

export const { Context, Provider } = createDataContext(
    blogReducer,
    {
        getBlogPosts,
        addBlogPost,
        deleteBlogPost,
        updateBlogPost
    },
    [])







// USING REDUCER and BEFORE MAKING THE CONTEXT AUTOMATED

// const BlogContext = React.createContext();

// const blogReducer = (state, action) => {

//     if (action.type == 'add_blogpost') {
//         return [...state, { title: `Blog Post #${state.length + 1}` }];
//     }

//     return state
// };

// export const BlogProvider = ({ children }) => {
//     const [blogPosts, dispatch] = useReducer(blogReducer, []);

//     const addBlogPost = () => {
//         dispatch({ type: 'add_blogpost' })
//     }

//     return (
//         <BlogContext.Provider
//             value={{
//                 data: blogPosts,
//                 addBlogPost
//             }}>
//             {children}
//         </BlogContext.Provider>
//     )
// };

// export default BlogContext;



// USING STATE =================== BACK UP CODE

// import React, { useState } from 'react';

// //source
// const BlogContext = React.createContext();

// export const BlogProvider = ({ children }) => {
//     const [blogPosts, setBlogPosts] = useState([]);

//     const addBlogPost = () => {
//         setBlogPosts([
//             ...blogPosts,
//             {
//                 title: `Blog Post #${blogPosts.length + 1}`
//             }]);
//     };

//     return (
//         <BlogContext.Provider
//             value={{
//                 data: blogPosts,
//                 addBlogPost: addBlogPost
//             }}>
//             {children}
//         </BlogContext.Provider>
//     )
// };

// export default BlogContext;