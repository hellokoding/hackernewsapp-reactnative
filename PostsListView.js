import React, {Component} from 'react';
import {StyleSheet, ListView, View, Text, TouchableHighlight} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import TimeAgo from 'react-native-timeago';
import PostWebView from './PostWebView';
import HackerNewsApi from './HackerNewsApi';

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
      var response = await fetch(this.props.postsApi);
      postIds = await response.json();
    }

    var posts = [];
    var startIndex = (page - 1) * LISTVIEW_PAGESIZE;
    var endIndex = startIndex + LISTVIEW_PAGESIZE - 1;
    var allLoaded = false;
    if (endIndex >= postIds.length) {
      endIndex = postIds.length - 1;
      allLoaded = true;
    }

    for(var i = startIndex; i <= endIndex; i++) {
      var postId = postIds[i];
      var response = await fetch(HackerNewsApi.post.replace('${postId}', postId));
      var post = await response.json();
      posts.unshift(post);
    }

    callback(posts, {
      allLoaded: allLoaded
    });
  }

  _onPressRowTitle(rowData) {
    if (rowData.type === 'comment') return;

    this.props.navigator.push({
      component: PostWebView,
      title: rowData.title,
      passProps: {
        uri: rowData.url
      }
    });
  }

  _onPressRowDetail(rowData) {
    if (!rowData.kids || !rowData.kids.length) return;

    this.props.navigator.push({
      component: PostsListView,
      title: rowData.title || this._fixCommentText(rowData.text),
      passProps: {
        postIds: rowData.kids
      }
    });
  }

  _fixCommentText(str){
  	return String(str).replace(/<p>/g, '\n\n')
  			   		  .replace(/&#x2F;/g, '/')
  			   		  .replace('<i>', '')
  			   		  .replace('</i>', '')
  			   		  .replace(/&#x27;/g, '\'')
  			   		  .replace(/&quot;/g, '\"')
  			   		  .replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)" rel="nofollow">(.*)?<\/a>/g, "$1");
  }

  _renderRowView(rowData) {
    var timeAgo = <TimeAgo time={rowData.time*1000} />;
    var score = '';
    var commentsCount = '';
    if (rowData.type === 'comment') {
      commentsCount = (!rowData.kids ? 0 : rowData.kids.length);
      commentsCount = (commentsCount == 1 ? '1 comment' : (commentsCount + ' comments'));
    } else {
      score = rowData.score + ' points';
      commentsCount = (rowData.descendants == 1 ? '1 comment' : (rowData.descendants + ' comments'));
    }

    return (
      <TouchableHighlight
        underlayColor='red'
        style={{flex: 1}}>
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitleText}
            onPress={() => this._onPressRowTitle(rowData)}>
            {rowData.title || this._fixCommentText(rowData.text)}
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
      <View style={styles.listViewContainer}>
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
      </View>
    )
  }
};

const styles = StyleSheet.create({
  listViewContainer: {
    flex: 1,
    marginTop: 30,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
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
    flex: 1,
    height: 1,
    backgroundColor: '#dddddd'
  },
  paginationView: {
    flex: 1,
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
