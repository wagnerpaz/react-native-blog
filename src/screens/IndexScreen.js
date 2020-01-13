import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';

import {Context as BlogContext} from '../context/BlogContext';

const IndexScreen = ({navigation}) => {
    const {state: blogPosts, getBlogPosts, addBlogPost, deleteBlogPost} = useContext(BlogContext);

    useEffect(() => {
        getBlogPosts();

        const didFocusListener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        return () => {
            didFocusListener.remove();
        };
    }, []);

    return (
        <View>
            <FlatList
                data={blogPosts}
                keyExtractor={item => item.title}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', {id: item.id})}>
                            <View style={styles.row}>
                                <Text styles={styles.title}>{item.title} - {item.id}</Text>
                                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    <Feather style={styles.icon} name="trash"/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus" size={30}/>
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    title: {
        fontSize: 18,
    },
    icon: {
        fontSize: 24,
    }
});

export default IndexScreen;