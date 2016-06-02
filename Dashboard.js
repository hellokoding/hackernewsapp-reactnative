import React, { Component } from 'react';
import { StyleSheet, Text, View, TabBarIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PostsListView from './PostsListView';
import HackerNewsApi from './HackerNewsApi';
import TabNavigator from 'react-native-tab-navigator';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'topTab'
    }
  }

  _renderContent(color, api) {
    return (
      <View style={{flex: 1, backgroundColor: color}}>
        <PostsListView
          navigator={this.props.navigator}
          postIds={false}
          postsApi={api}>
        </PostsListView>
      </View>
    );
  }

  render() {
    let iconSize = 28;
    let iconColor = '#ff6600';

    return (
      <TabNavigator tabBarStyle={{backgroundColor: 'white'}}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'topTab'}
          title="Top"
          renderIcon={() => <Icon name="ios-heart-outline" color={iconColor}  size={iconSize}/>}
          renderSelectedIcon={() => <Icon name="ios-heart" color={iconColor} size={iconSize}/>}
          onPress={() => this.setState({ selectedTab: 'topTab' })}>
          {this._renderContent('white', HackerNewsApi.topStories)}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'newTab'}
          title="New"
          renderIcon={() => <Icon name="ios-bulb-outline" color={iconColor} size={iconSize}/>}
          renderSelectedIcon={() => <Icon name="ios-bulb" color={iconColor} size={iconSize}/>}
          onPress={() => this.setState({ selectedTab: 'newTab' })}>
          {this._renderContent('white', HackerNewsApi.newStories)}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'showTab'}
          title="Show"
          renderIcon={() => <Icon name="ios-sunny-outline" color={iconColor} size={iconSize}/>}
          renderSelectedIcon={() => <Icon name="ios-sunny" color={iconColor} size={iconSize}/>}
          onPress={() => this.setState({ selectedTab: 'showTab' })}>
          {this._renderContent('white', HackerNewsApi.showStories)}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'askTab'}
          title="Ask"
          renderIcon={() => <Icon name="ios-chatboxes-outline" color={iconColor} size={iconSize}/>}
          renderSelectedIcon={() => <Icon name="ios-chatboxes" color={iconColor} size={iconSize}/>}
          onPress={() => this.setState({ selectedTab: 'askTab' })}>
          {this._renderContent('white', HackerNewsApi.askStories)}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'jobTab'}
          title="Job"
          renderIcon={() => <Icon name="ios-code-working-outline" color={iconColor} size={iconSize}/>}
          renderSelectedIcon={() => <Icon name="ios-code-working" color={iconColor} size={iconSize}/>}
          onPress={() => this.setState({ selectedTab: 'jobTab' })}>
          {this._renderContent('white', HackerNewsApi.jobStories)}
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

module.exports = Dashboard;
