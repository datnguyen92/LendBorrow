// @flow

import React, { Component } from 'react'
import { Scene, Router, Reducer } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Navigation/CustomNavBar'
import { Log } from '../Lib'
import { connect } from 'react-redux'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import AllComponentsScreen from '../Containers/AllComponentsScreen'
import LoginScreen from '../Containers/LoginScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

const AppRouter = connect()(Router)

class NavigationRouter extends Component {
  render () {
    let catchInitialState = true

    const reducerCreate = params => {
      const defaultReducer = Reducer(params)

      return (state, action) => {
        if (action.type == '') {
          catchInitialState = true
        }

        if (catchInitialState && action.type == 'RootContainerInitialAction') {
          catchInitialState = false
          // Initial screen tracker may go here
          Log.debug(message = action)
          
        }

        if (action.type == 'REACT_NATIVE_ROUTER_FLUX_PUSH' || action.type == 'REACT_NATIVE_ROUTER_FLUX_RESET') {
          // Other screens tracker may go here
          Log.debug(message = `Screen (${action.key}) show up`)
        }

        return defaultReducer(state, action)
      }
    }

    return (
      <AppRouter createReducer={reducerCreate}>
        <Scene key='container'>
          <Scene key='wrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='loginScreen' component={LoginScreen} title='' hideNavBar />
            <Scene key='componentExamples' component={AllComponentsScreen} title='Components' />
          </Scene>
        </Scene>
      </AppRouter>
    )
  }
}

export default NavigationRouter