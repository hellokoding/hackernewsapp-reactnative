import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Navigator, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from './Dashboard';

class HackerNewsApp extends Component {
  _renderScene(route, navigator) {
    return <route.component navigator={navigator} title={route.title} {...route.passProps} />
  }

  render() {
    var NavigationBarRouteMapper = {
      LeftButton(route, navigator, index, navState) {
        if(index > 0) {
          return (
            <View style={{marginLeft: 10}}>
              <Icon
                name="ios-arrow-back"
                color="#ff6600"
                size={26}
                onPress={() => { if (index > 0) { navigator.pop() } }} />
            </View>
          )
        }
        else { return null }
      },
      RightButton(route, navigator, index, navState) {
        return null
      },
      Title(route, navigator, index, navState) {
        let marginLeft = (route.title == 'Hacker News' ? 0 : 30);
        return (
          <View style={{flex: 1, marginLeft: marginLeft}}>
            <Text style={ styles.title } numberOfLines={1}>{route.title || 'Hacker News'}</Text>
          </View>
        )
      }
    };

    return (
      <Navigator style={{flex: 1, backgroundColor: 'white'}}
        initialRoute={{
          component: Dashboard,
          title: 'Hacker News'
        }}
        renderScene={this._renderScene}
        navigationBar={
          <Navigator.NavigationBar
            navigationStyles={Navigator.NavigationBar.StylesIOS}
            routeMapper={ NavigationBarRouteMapper } />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

AppRegistry.registerComponent('HackerNewsApp', () => HackerNewsApp);
