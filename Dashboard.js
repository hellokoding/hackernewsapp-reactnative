import React, { Component } from 'react';
import { StyleSheet, Text, View, TabBarIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PostsListView from './PostsListView';
import HackerNewsApi from './HackerNewsApi';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'topTab'
    }
  }

  _renderContent(color, api) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <PostsListView
          navigator={this.props.navigator}
          postIds={false}
          postsApi={api}>
        </PostsListView>
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
              selectedTab: 'topTab'
            });
          }}
          style={styles.tabBarItem}>
          {this._renderContent('white', HackerNewsApi.topStories)}
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="New"
          iconName="ios-bulb-outline"
          selectedIconName="ios-bulb"
          selected={this.state.selectedTab === 'newTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'newTab'
            });
          }}
          style={styles.tabBarItem}>
          {this._renderContent('white', HackerNewsApi.newStories)}
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="Show"
          iconName="ios-sunny-outline"
          selectedIconName="ios-sunny"
          selected={this.state.selectedTab === 'showTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'showTab'
            });
          }}
          style={styles.tabBarItem}>
          {this._renderContent('white', HackerNewsApi.showStories)}
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="Ask"
          iconName="ios-chatboxes-outline"
          selectedIconName="ios-chatboxes"
          selected={this.state.selectedTab === 'askTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'askTab'
            });
          }}
          style={styles.tabBarItem}>
          {this._renderContent('white', HackerNewsApi.askStories)}
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="Jobs"
          iconName="ios-code-working-outline"
          selectedIconName="ios-code-working"
          selected={this.state.selectedTab === 'jobTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'jobTab'
            });
          }}
          style={styles.tabBarItem}>
          {this._renderContent('white', HackerNewsApi.jobStories)}
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
