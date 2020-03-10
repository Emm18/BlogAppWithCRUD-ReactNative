import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';

import BlogPostForm from '../components/BlogPostForm';

const EditScreen = (props) => {
    const id = props.navigation.getParam('id')
    const { state, updateBlogPost} = useContext(Context);

    const blogPost = state.find(
        (blogPost) => blogPost.id === id
    );

    return (
        <BlogPostForm
            initialValues={{
                title: blogPost.title,
                content: blogPost.content
            }}
            onSubmit={(title, content) => {
                //props.navigation.navigate('Index')
                updateBlogPost(id, title, content, () => props.navigation.pop())
            }}
        />
    )
}

const styles = StyleSheet.create({

});

export default EditScreen;