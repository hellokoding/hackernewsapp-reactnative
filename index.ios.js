import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, NavigatorIOS } from 'react-native';
import HackerNewsApp from './HackerNewsApp';

class HackerNewsApp1 extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#FF6600'
        initialRoute={{
          component: HackerNewsApp,
          title: 'Hacker News',
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

AppRegistry.registerComponent('HackerNewsApp', () => HackerNewsApp1);
