import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text>Bottom Navigation</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 10,
        backgroundColor: '#eee',
    },
});

export default Footer; 