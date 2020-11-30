import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import PlacesScreen from '../screens/PlacesScreen';
import ExpensesScreen from "../screens/ExpensesScreen";
import AddExpensesScreen from "../screens/AddExpensesScreen";
import LoginScreen from "../screens/LoginScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Expenses"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Expenses"
        component={ExpensesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon family="MaterialIcons"  name="attach-money" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Places"
        component={PlacesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon family="Ionicons"  name="md-map" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon family="Ionicons"  name="ios-settings" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return props.family === "Ionicons" ? <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />: <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ExpensesStack = createStackNavigator();

function ExpensesNavigator() {
  return (
    <ExpensesStack.Navigator>
      <ExpensesStack.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{ headerTitle: 'Expenses' }}
      />
      <ExpensesStack.Screen
        name="AddExpenses"
        component={AddExpensesScreen}
        options={{ headerTitle: 'Add Expenses' }}
      />
    </ExpensesStack.Navigator>
  );
}

const PlacesStack = createStackNavigator();

function PlacesNavigator() {
  return (
    <PlacesStack.Navigator>
      <PlacesStack.Screen
        name="PlacesScreen"
        component={PlacesScreen}
        options={{ headerTitle: 'Places' }}
      />
    </PlacesStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsNavigator() {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen
          name="PlacesScreen"
          component={LoginScreen}
          options={{ headerTitle: 'Settings' }}
        />
      </SettingsStack.Navigator>
    );
  }