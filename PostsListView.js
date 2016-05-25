import React, {Component} from 'react';
import {StyleSheet, ListView, View, Text, TouchableHighlight} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import TimeAgo from 'react-native-timeago';

const HackerNewsApi = {
  topStories: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  post: 'https://hacker-news.firebaseio.com/v0/item/${postId}.json'
};

const LISTVIEW_PAGESIZE = 2;

class PostsListView extends Component {
  constructor(props) {
    super(props);
  }

  async _onFetch(page=1, callback, options) {
    var response = await fetch(HackerNewsApi.topStories);
    var postIds = await response.json();

    var posts = [];
    var startIndex = (page - 1) * LISTVIEW_PAGESIZE;
    var endIndex = startIndex + LISTVIEW_PAGESIZE;
    for(var i = startIndex; i < endIndex; i++) {
      var postId = postIds[i];
      var response = await fetch(HackerNewsApi.post.replace('${postId}', postId));
      var post = await response.json();
      posts.unshift(post);
    }

    callback(posts);
  }

  _renderRowView(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#dddddd'>
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitleText}>{rowData.title}</Text>
          <View style={styles.rowDetailContainer}>
            <Text style={styles.rowDetailText}>{rowData.score} points by {rowData.by} | <TimeAgo time={rowData.time*1000} /> | {rowData.descendants} comments</Text>
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
  rowContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  rowTitleText: {
    fontSize: 18
  },
  rowDetailContainer: {
    flex: 1,
    marginTop: 2
  },
  rowDetailText: {
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

module.exports = PostsListView;
