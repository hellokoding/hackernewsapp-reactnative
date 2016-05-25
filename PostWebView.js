import React, {Component} from 'react';
import {WebView} from 'react-native';

class PostWebView extends Component {
  render() {
    return (
      <WebView source={{uri: this.props.uri}}></WebView>
    );
  }
};

module.exports = PostWebView;
