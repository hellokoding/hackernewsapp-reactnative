import React, { Component } from 'react';
import { StyleSheet, Text, View, TabBarIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PostsListView from './PostsListView';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'popularTab',
      notifCount: 0,
      presses: 0
    }
  }

  _renderContent(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <PostsListView></PostsListView>
      </View>
    );
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="black"
        tintColor="#ff6600"
        barTintColor="white"
        style={styles.tabBar}>
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
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flex: 1
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10
  }
});

module.exports = Dashboard;
