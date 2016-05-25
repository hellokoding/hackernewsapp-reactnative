import React, {Component} from 'react';
import {StyleSheet, ListView, View, Text, TouchableHighlight} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import TimeAgo from 'react-native-timeago';

const HackerNewsApi = {
  topStories: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  story: 'https://hacker-news.firebaseio.com/v0/item/${storyId}.json'
};

const LISTVIEW_PAGESIZE = 2;

class InfiniteScrollingListView extends Component {
  constructor(props) {
    super(props);
  }

  async _onFetch(page=1, callback, options) {
    var response = await fetch(HackerNewsApi.topStories);
    var storyIds = await response.json();

    var stories = [];
    var startIndex = (page - 1) * LISTVIEW_PAGESIZE;
    var endIndex = startIndex + LISTVIEW_PAGESIZE;
    for(var i = startIndex; i < endIndex; i++) {
      var storyId = storyIds[i];
      var response = await fetch(HackerNewsApi.story.replace('${storyId}', storyId));
      var story = await response.json();
      stories.unshift(story);
    }

    callback(stories);
  }

  _renderRowView(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#dddddd'>
        <View style={styles.storyContainer}>
          <Text style={styles.storyTitleText}>{rowData.title}</Text>
          <View style={styles.storyDetailContainer}>
            <Text style={styles.storyDetailText}>{rowData.score} points by {rowData.by} | <TimeAgo time={rowData.time*1000} /> | {rowData.descendants} comments</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _renderSeparatorView() {
    return (
      <View style={styles.separator} />
    );
  }

  _renderPaginationWaitingView(paginateCallback) {
    return (
      <TouchableHighlight
        underlayColor='#c8c7cc'
        onPress={paginateCallback}
        style={styles.paginationView}
      >
        <Text style={[styles.actionsLabel, {fontSize: 13}]}>
          load more
        </Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <GiftedListView
        rowView={this._renderRowView}
        renderSeparator={this._renderSeparatorView}
        onFetch={this._onFetch}
        firstLoader={true}
        pagination={true}
        paginationWaitingView={this._renderPaginationWaitingView}
        refreshable={true}
        withSections={false}
        refreshableTintColor='blue'
        style={styles.listView}
      />
    )
  }
};

const styles = StyleSheet.create({
  listView: {
    flex: 1
  },
  storyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  storyTitleText: {
    fontSize: 18
  },
  storyDetailContainer: {
    flex: 1,
    //flexDirection: 'row',
    marginTop: 2
  },
  storyDetailText: {
    fontSize: 11,
    color: '#828282'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  paginationView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  actionsLabel: {
    fontSize: 20,
    color: '#007aff',
  }
});

module.exports = InfiniteScrollingListView;
