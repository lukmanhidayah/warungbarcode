import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Beranda from './pages/beranda/Beranda';
import Transaksi from './pages/transaksi/Transaksi';
import Icon from './components/icon/Icon';


const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
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
          activeTintColor: '#36a970',
          inactiveTintColor: 'gray',
          labelStyle:{
            fontFamily:'SourceSansPro-SemiBold'
          }
        }}

      >
        <Tab.Screen name="Beranda" component={Beranda} />
        <Tab.Screen name="Transaksi" component={Transaksi} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
