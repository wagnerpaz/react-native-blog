import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

const BlogPostForm = ({onSubmit, initialValues = {title: '', content: ''}}) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View>
            <Text style={styles.label}>Title:</Text>
            <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
            <Text style={styles.label}>Content:</Text>
            <TextInput style={styles.input} value={content} onChangeText={text => setContent(text)} />
            <Button
                title="Save"
                onPress={() => onSubmit(title, content)}
            />
        </View>
    );
};

//ALTERNATIVE WAY OF DEFINING DEFAULT PROPS
BlogPostForm.defaultProps = {

};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        padding: 5,
        margin: 10,
    },
    label: {
        fontSize: 20,
        marginBottom: -5,
        marginLeft: 10,
        marginTop: 5,
    }
});

export default BlogPostForm;