import React, {Component} from 'react';
import {StyleSheet, ListView, View, Text, TouchableHighlight} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import TimeAgo from 'react-native-timeago';
import PostWebView from './PostWebView';

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
    var postIds = [];
    if (this.props.postIds) {
      postIds = this.props.postIds;
    } else {
      var response = await fetch(HackerNewsApi.topStories);
      postIds = await response.json();
    }

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

  _onPressRowTitle(rowData) {
    this.props.navigator.push({
      component: PostWebView,
      title: rowData.title,
      passProps: {
        uri: rowData.url
      }
    });
  }

  _onPressRowDetail(rowData) {
    this.props.navigator.push({
      component: PostsListView,
      title: rowData.title,
      passProps: {
        postIds: rowData.kids
      }
    });
  }

  _renderRowView(rowData) {
    var timeAgo = <TimeAgo time={rowData.time*1000} />;
    var score = '';
    var commentsCount = '';
    if (rowData.type !== 'comment') {
      score = rowData.score + ' points';
      commentsCount = rowData.descendants + ' comments';
    } else {
      commentsCount = (!rowData.kids ? 0 : rowData.kids.length) + ' comments';
    }

    return (
      <TouchableHighlight
        underlayColor='red'>
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitleText}
            onPress={() => this._onPressRowTitle(rowData)}>
            {rowData.title || rowData.text}
          </Text>
          <View style={styles.rowDetailContainer}>
            <Text style={styles.rowDetailText}
              onPress={() => this._onPressRowDetail(rowData)}>
              {score} by {rowData.by} | {timeAgo} | {commentsCount}
            </Text>
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
        rowView={(rowData) => this._renderRowView(rowData)}
        renderSeparator={this._renderSeparatorView}
        onFetch={(page=1, callback, options) => this._onFetch(page, callback, options)}
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
