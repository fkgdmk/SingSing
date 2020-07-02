import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';


export default class SongView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            song: null,
            songs: null,
            isLoading: true
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="small" color="#00ff00" />
                </View>
            );
        } else {
            return (
                <TouchableOpacity activeOpacity={.8} style={styles.container} onPress={() => this.changeSong()}>
                    <View style={styles.upperSection}>
                        <Text style={{ fontSize: 20, color: '#545D7A', fontFamily: 'monospace', textAlign: "center" }}>{this.state.song.partOne}</Text>
                        <HorizontalLine color={Colors.red}  margin={25} />
                        <Text style={{ fontSize: 20, color: Colors.purple, fontFamily: 'monospace', textAlign: "center" }}>{this.state.song.partTwo}</Text>
                    </View>
                    <View style={styles.lowerSection}>
                        <Text style={{ fontSize: 20, color: '#545D7A', fontFamily: 'monospace', textAlign: "center" }}>{this.state.song.title}</Text>
                        <HorizontalLine color={Colors.yellow} margin={25} />
                        <Text style={{ fontSize: 20, color: Colors.purple, fontFamily: 'monospace', textAlign: "center" }}>{this.state.song.artist}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    componentDidMount() {
        var songArr = require('../utilities/output.json');
        const song = this.getRandomSong(songArr);
        this.setState({ song, isLoading: false })
    }

    changeSong() {
        console.log(this.state.songs)
        const randomSong = this.getRandomSong(this.state.songs);
        console.log(randomSong);
        this.setState({song: randomSong});
    }
    
    getRandomSong(arr = []) {
        const index = Math.floor(Math.random() * arr.length);
        const song = arr[index];
        arr.splice(index, 1);
        this.setState({ songs : arr });
    
        // song.partOne = this.createNewLineInsteadOfHyphen(song.partOne);
        // song.partTwo = this.createNewLineInsteadOfHyphen(song.partTwo);
        return song;
    }
}


function createNewLineInsteadOfHyphen(lyricPart) {
    return lyricPart.replace(/-/g, '\n\n');
}

function HorizontalLine(props) {
    return (
        <View style={{
            borderWidth: 0.6,
            borderColor: props.color,
            width: 100,
            color: props.color,
            margin: props.margin
        }}></View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: Colors.yellow
    },
    upperSection: {
        alignItems: 'center',
        height: '70%',
        justifyContent: 'center',
    },
    lowerSection: {
        backgroundColor: Colors.red,
        alignItems: 'center',
        width: '100%',
        height: '30%',
        paddingTop: 30
    },
    hr: {
        borderWidth: 0.5,
        borderColor: '#ff8080',
        width: 100,
        margin: 30
    }
});