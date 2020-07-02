import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';


export default class SongView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Sådan spiller du</Text>
                <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </Text>
                <Text style={styles.text}>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
                <Text style={styles.text}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.yellow,
        padding: 20,
    },

    title: {
        color: Colors.red, 
        fontWeight: "bold",
        fontSize: 28,
        marginBottom: 5
    },

    text: {
        color: Colors.purple,
        marginBottom: 20,
        fontSize: 16
    }

});