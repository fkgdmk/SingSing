import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from './constants/Colors';

// import HomeScreen from './screens/HomeScreen';
import useLinking from './navigation/useLinking';
import SongView from './components/SongView';
import RulesView from './components/RulesView';
const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <StackContainer />
        </NavigationContainer>
      </View>
    );
  }
}

function StackContainer() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Song"
        component={SongScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Regler"
        component={RulesScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.red,
          },
          headerTitleStyle: {
            color: 'white'
          },
          headerTintColor: 'white'
        }}
      />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{marginBottom: 20}} activeOpacity={.8} onPress={() => navigation.navigate('Song')}>
        <View style={styles.menuButton}>
          <Text style={{color: 'white'}}>SPIL</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate('Regler')}>
      <View style={styles.menuButton}>
        <Text style={{color: 'white'}}>REGLER</Text>
      </View >
      </TouchableOpacity>

    </View >
  );
}

function SongScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      {/* <Button title="Go back123" onPress={() => navigation.goBack()} /> */}
      <SongView />
    </View>
  );
}

function RulesScreen({navigation}) {
  return (
    <View style={{ flex: 1 }}>
      {/* <Button title="Go back123" onPress={() => navigation.goBack()} /> */}
      <RulesView/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.yellow,
    justifyContent: 'center',
  },

  menuButton: {
      width: '50%',
      alignSelf: 'center',
      backgroundColor: Colors.red, 
      alignItems: 'center',
      justifyContent: 'center', 
      borderRadius: 30,
      padding: 20
  },

  rulesButton: {
    alignSelf: 'center',
    width: '50%',
    justifyContent: 'center'
  }
});
