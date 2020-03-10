import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext'

import { Feather } from '@expo/vector-icons'

const IndexScreen = (props) => {
    const blogPosts = useContext(Context);

    useEffect(() => {
        blogPosts.getBlogPosts();

        //runs a call back function when focuses onthe screen
        const listener = props.navigation.addListener('didFocus', () => {
            blogPosts.getBlogPosts();
        })

        //cleanup
        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View>
            <FlatList
                data={blogPosts.state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={(blogPost) => {
                    return (
                        <TouchableOpacity onPress={() => props.navigation.navigate('Show', { id: blogPost.item.id })}>
                            <View style={styles.row}>

                                <Text style={styles.title}>{blogPost.item.title} - {blogPost.item.id}</Text>

                                <TouchableOpacity onPress={() => blogPosts.deleteBlogPost(blogPost.item.id)}>
                                    <Feather style={styles.icon} name="trash" />
                                </TouchableOpacity>

                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )

}

IndexScreen.navigationOptions = (props) => {
    return {
        headerRight: () => <TouchableOpacity onPress={() => props.navigation.navigate('Create')}>
            <Feather name="plus" size={30} style={{ marginRight: 10 }} />
        </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 25
    }
});

export default IndexScreen;