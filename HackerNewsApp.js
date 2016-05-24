'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = ReactNative;
import Icon from 'react-native-vector-icons/Ionicons';
import InfiniteScrollingListView from './components/InfiniteScrollingListView';

var HackerNewsApp = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'TabBarExample',

  getInitialState: function() {
    return {
      selectedTab: 'popularTab',
      notifCount: 0,
      presses: 0,
    };
  },

  _renderContent: function(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <InfiniteScrollingListView></InfiniteScrollingListView>
      </View>
    );
  },

  render: function() {
    return (
      <TabBarIOS
        unselectedTintColor="black"
        tintColor="#ff6600"
        barTintColor="white">
        <Icon.TabBarItem
          color="red"
          title="Popular"
          iconName="ios-heart-outline"
          selectedIconName="ios-heart"
          selected={this.state.selectedTab === 'popularTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'popularTab',
              presses: this.state.presses + 1
            });
          }}
          >
          {this._renderContent('white', 'Popular', this.state.presses)}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="New"
          iconName="ios-pulse-outline"
          selectedIconName="ios-pulse"
          selected={this.state.selectedTab === 'newTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'newTab',
              presses: this.state.presses + 1
            });
          }}
          >
          {this._renderContent('white', 'New', this.state.presses)}
        </Icon.TabBarItem>

      </TabBarIOS>
    );
  },

});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 1,
    paddingRight: 1
  },
  tabText: {
    color: 'black',
    margin: 50,
  },
});

module.exports = HackerNewsApp;
