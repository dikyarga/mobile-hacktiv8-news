import React from 'react'
import { AppRegistry, View, Text, ActivityIndicator, ScrollView } from 'react-native'
import axios from 'axios'
// import { StackNavigator } from 'react-navigation';

// import { Home } from './config/router'

import SearchBar from './components/SearchBar'

class App extends React.Component {
  // static navigationOptions = {
  //   title: 'Welcome',
  // };
  constructor(){
    super()
    this.state = {
      news: [],
      searchKey: '',
    }
  }

  getNews(){
    axios.get('http://hn.algolia.com/api/v1/search?query=programming').then((response) => {
      console.log('isi response : ', response.data.hits);
      this.setState({
        news: response.data.hits
      })
    }).catch((err) => {
      console.log('Err when trying to get News : ', err);
    })
  }

  setSearch(query) {
    console.log('isi query : ', query);
    this.setState({
      searchKey: query
    })
  }

  componentDidMount(){
    console.log('jalan cuy!');
    this.getNews()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Hacktiv8 News</Text>
      <SearchBar style={styles.search_bar} setSearch={this.setSearch.bind(this)} />
        <Text style={styles.welcome}>
          Daftar ketertarikan mu! {this.state.news.length}
        </Text>
        <ScrollView>
          { this.state.news.length == 0
            ?
             <ActivityIndicator animation={true} />
            :
              this.state.news.filter(newsItem => {
                console.log('isi searchKey :', this.state.searchKey);
                let patt = new RegExp(this.state.searchKey, 'gi')
                console.log('jalan gak filternya : ', newsItem.title, patt.test(newsItem.title));
                return patt.test(newsItem.title)
              }).map((aNews, index) => {
                console.log('isi a News : ', aNews);
                return (
                  <Text style={styles.title} key={index}>- {aNews.title}</Text>
                )
              })
          }
        </ScrollView>

      </View>
    )
  }
}

// const SimpleApp = StackNavigator({
//   Home: { screen: HomeScreen },
// });

const styles = {
  container: {
    backgroundColor: '#F5FCFF',
    width: '100%',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logo: {
    fontSize: 24
  },
  search_bar: {
    width: '100%'
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    paddingLeft: 20,
  },
  content: {
    fontSize: 15,
    textAlign: 'left',
    paddingLeft: 20,
  }
};

AppRegistry.registerComponent('DikyAwesomeProject', () => App);
