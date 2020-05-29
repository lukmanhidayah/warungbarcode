import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';

//pages
import Beranda from './pages/beranda/Beranda';
import Transaksi from './pages/transaksi/Transaksi';
import Produk from './pages/produk/Produk'
//components
import Icon from './components/icon/Icon';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let type = "AntDesign";
          let size = 24;
          if (route.name === 'Beranda') {
            iconName = focused ? 'home' : 'home';
            type = focused ? 'MaterialIcons' : 'AntDesign';
            size = focused ? 28 : 24
          } else if (route.name === 'Transaksi') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
            type = 'Ionicons'
          }

          // You can return any component that you like here!
          return <Icon type={type} name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#14462d',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontFamily: 'SourceSansPro-SemiBold'
        }
      }}

    >
      <Tab.Screen name="Beranda" component={Beranda} />
      <Tab.Screen name="Transaksi" component={Transaksi} />
    </Tab.Navigator>
  );
}

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default function App() {
  return (
    <NavigationContainer

    >
      <Stack.Navigator

      >
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Produk" component={Produk}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
