import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { EvilIcons } from '@expo/vector-icons'

const ShowScreen = (props) => {
    // console.log(props.navigation.getParam('id'));
    //props.navigation.state.params

    const { state } = useContext(Context);

    const blogPost = state.find((blogPost) => blogPost.id === props.navigation.getParam('id'))

    return (
        <View>
            <Text>
                {blogPost.title}
                {blogPost.content}
            </Text>
        </View>
    )
}

ShowScreen.navigationOptions = (props) => {
    return {
        headerRight: () => <TouchableOpacity onPress={() => props.navigation.navigate('Edit', { id: props.navigation.getParam('id') })}>
            <EvilIcons name="pencil" size={35} style={{ marginRight: 10 }} />
        </TouchableOpacity>
    };
};

const styles = StyleSheet.create({

})

export default ShowScreen;