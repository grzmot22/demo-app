import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { connect } from "react-redux";
import LoginScreen  from "../screens/LoginScreen";


import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export  function Navigation({ colorScheme, userId }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator auth={userId}/>
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator({userId}) {
  console.log("login", userId)
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
     {/* {userId !== "" ? (
      // No token found, user isn't signed in
      <Stack.Screen
        name="SignIn"
        component={LoginScreen}
        options={{
          title: 'Sign in',
        }}
      />
    ) : ( */}
      <>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </>
      {/* )} */}
    </Stack.Navigator>
  );
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userId
});


export default connect(mapStateToProps)(Navigation);