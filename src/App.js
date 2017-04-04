import React from 'react'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import axios from 'axios'

import SearchBar from './components/SearchBar'

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      news: [],
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

  componentDidMount(){
    console.log('jalan cuy!');
    this.getNews()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Hacktiv8 News</Text>
        <SearchBar style={styles.search_bar}/>
        <Text style={styles.welcome}>
          Daftar ketertarikan mu! {this.state.news.length}
        </Text>
        <ScrollView>
          { this.state.news.length == 0
            ?
             <ActivityIndicator animation={true} />
            :
              this.state.news.map((newsItem, index) => {
                return (
                  <Text style={styles.title} key={index}>- {newsItem.title}</Text>

                )
              })
          }
        </ScrollView>



      </View>
    )
  }
}

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
