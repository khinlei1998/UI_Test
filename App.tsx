import { Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import WalletScreen from './src/screen/WalletScreen';
import MoreScreen from './src/screen/MoreScreen';
import DetailScreen from './src/screen/DetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailScreen} />
  </Stack.Navigator>
);

const tabs = [
  {
    title: 'Main',
    name: 'Home',
    screen: HomeStack,
    icon: require('./src/assets/10.png'),
  },
  {
    title: 'Wallet',
    name: 'Wallet',
    screen: WalletScreen,
    icon: require('./src/assets/10.png'),
  },
  {
    title: 'More',
    name: 'More',
    screen: MoreScreen,
    icon: require('./src/assets/9.png'),
  },
];

const renderTabIcon = ({ icon }: any) => (
  <View style={styles.iconTab}>
    <Image source={icon} style={styles.imgSize} />
  </View>
);

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#C5C5C5',
        }}
      >
        {tabs.map(({ name, screen, icon }, index) => (
          <Tab.Screen
            key={index}
            name={name}
            component={screen}
            options={{
              tabBarIcon: () => renderTabIcon({ icon }),
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  iconTab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgSize: {
    width: 25,
    height: 25,
  },
});
