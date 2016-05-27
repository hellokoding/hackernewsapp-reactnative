import React, { Component } from 'react';
import { StyleSheet, Text, View, TabBarIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PostsListView from './PostsListView';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'topTab',
      notifCount: 0,
      presses: 0
    }
  }

  _renderContent(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <PostsListView navigator={this.props.navigator} postIds={false}></PostsListView>
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
          title="Top"
          iconName="ios-heart-outline"
          selectedIconName="ios-heart"
          selected={this.state.selectedTab === 'topTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'topTab',
              presses: this.state.presses + 1
            });
          }}
          style={styles.tabBarItem}>
          {this._renderContent('white', 'Top', this.state.presses)}
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
          style={styles.tabBarItem}>
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
  tabBarItem: {
    flex: 1
  },
  tabContent: {
    flex: 1
  }
});

module.exports = Dashboard;
