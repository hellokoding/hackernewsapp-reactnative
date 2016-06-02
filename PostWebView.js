import React, {Component} from 'react';
import {Platform, WebView} from 'react-native';
//var { Platform } = React;

class PostWebView extends Component {
  render() {
    let marginTop = (Platform.OS === 'ios') ? 0 : 60;
    return (
      <WebView
        source={{uri: this.props.uri}}
        style={{flex: 1, marginTop: marginTop}}>
      </WebView>
    );
  }
};

module.exports = PostWebView;
