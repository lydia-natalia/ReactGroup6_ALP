import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenName from './ScreenName';
import HomeScreen from '../screens/Home';
import AboutScreen from '../screens/About';
import DetailScreen from '../screens/Detail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const stackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={ScreenName.HomeScreen}>
            <Stack.Screen options={{ headerShown: false }} name={ScreenName.HomeScreen} component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name={ScreenName.DetailScreen} component={DetailScreen} />
        </Stack.Navigator>
    )
}

export default function RouteNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions={{
                    tabBarActiveTintColor: '#e91e63',
                }}>
                <Tab.Screen name={"Home"} component={stackNavigator}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                      }} />
                <Tab.Screen name={ScreenName.AboutScreen} component={AboutScreen} 
                    options={{
                        headerShown: false,
                        tabBarLabel: 'About',
                        tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons name="about" color={color} size={size} />
                        ),
                      }}
                    />
            </Tab.Navigator>
        </NavigationContainer>
    );
}