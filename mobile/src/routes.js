import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from './pages/SignIn';

import CheckIns from './pages/CheckIns';
import HelpOrderList from './pages/New/HelpOrderList';
import HelpOrder from './pages/New/HelpOrder';
import NewHelpOrder from './pages/New/NewHelpOrder';

import Logo from '~/components/Logo';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            CheckIns: {
              screen: CheckIns,
              navigationOptions: {
                tabBarLabel: 'Check-ins',
                tabBarIcon: ({tintColor}) => (
                  <Icon name="room" size={20} color={tintColor} />
                ),
              },
            },
            New: {
              screen: createStackNavigator(
                {
                  HelpOrderList,
                  HelpOrder,
                  NewHelpOrder,
                },
                {
                  defaultNavigationOptions: {
                    headerRight: () => <Logo />,
                    headerTransparent: false,
                    headerTintColor: '#fff',
                    headerStyle: {
                      borderBottomColor: '#DDDDDD',
                    },
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                    headerRightContainerStyle: {
                      marginRight: 150,
                    },
                  },
                },
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: ({tintColor}) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
              },
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
