import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Post = () => {
    return (
        <View style={styles.post}>
            <Text>Profile Name</Text>
            <View style={styles.postContent}></View>
            <Text>Comments Count / Likes Count</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    post: {
        width: 300,
        margin: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    postContent: {
        height: 150,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
});

export default Post; 