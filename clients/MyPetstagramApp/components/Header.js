import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>Logo</Text>
            <Button title="Search" onPress={() => { }} />
            <Button title="Mode" onPress={() => { }} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    logo: {
        fontSize: 20,
    },
});

export default Header; 