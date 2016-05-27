import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, NavigatorIOS } from 'react-native';
import Dashboard from './Dashboard';

class HackerNewsApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#FF6600'
        initialRoute={{
          component: Dashboard,
          title: 'Top',
          backButtonTitle: '',
          passProps: { myProp: 'foo' },
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF'
  }
});

AppRegistry.registerComponent('HackerNewsApp', () => HackerNewsApp);
