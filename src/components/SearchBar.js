import React from 'react'
import { View, TextInput } from 'react-native'

export default class SearchBar extends React.Component {
  render() {
    return (
      <View style={{width: '100%'}}>
          <TextInput sytle={styles.search_bar} placeholder='Cari yang kamu suka disini'></TextInput>
      </View>

    )
  }
}

const styles = {
  search_bar: {
    width: 200,
    paddingRight: 20,
    paddingLeft: 20,
  }
};
