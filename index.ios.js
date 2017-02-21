import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Navigator,
  TouchableHighlight
} from 'react-native';
import {text_1, text_2} from './content.js';

const content = [
  {
    title: 'Статейка',
    text: text_1
  }, {
    title: 'Ее продолжение',
    text: text_2
  }
];

class Article extends Component {
  render() {
    const {
      title,
      text,
      onForward,
      onBack
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight onPress={onBack}>
            <Text style={styles.headerButton}>
              Назад
            </Text>
          </TouchableHighlight>
          <Text style={styles.headerTitle}>
            {title}
          </Text>
          <TouchableHighlight onPress={onForward}>
            <Text style={styles.headerButton}>
              Далее
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
          <ScrollView>
              {
                text
                  .split('\n')
                  .filter(l => !!l)
                  .map((l, i) => {
                    return l.length <= 120
                      ? <Text key={i} style={styles.title}>{l}</Text>
                      : <Text key={i} style={styles.paragraph}>{l}</Text>
                  })
              }
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default class try_native extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{title: 'First', index: 0}}
        renderScene={(route, navigator) => {
          return (
            <Article
              title={content[route.index] ? content[route.index].title : 'NO_ROUTE'}
              text={content[route.index] ? content[route.index].text : 'NO_SUCH_TEXT'}
              onForward={() => {
                const nextIndex = route.index + 1;
                if (content[nextIndex]) {
                  navigator.push({
                    title: 'PAGE ' + nextIndex,
                    index: nextIndex,
                  });
                }
              }}
              onBack={() => {
                if (route.index > 0) {
                  navigator.pop();
                }
              }}
            />
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'rgb(47, 167, 119)',
    flexDirection: 'row',
    height: 50,
    marginTop: 20
  },
  headerButton: {
    width: 60,
    lineHeight: 50,
    color: 'white',
    textAlign: 'center',
  },
  headerTitle: {
    color: 'white',
    lineHeight: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  },
  content: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    // paddingVertical: 20
  },
  paragraph: {
    marginBottom: 10,
    fontSize: 14
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 23
  }
});

AppRegistry.registerComponent('try_native', () => try_native);
