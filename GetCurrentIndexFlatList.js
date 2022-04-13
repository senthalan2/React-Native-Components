import { View,FlatList } from 'react-native'
import React from 'react'

const GetCurrentIndexFlatList = () => {
  return (
    <View style={{flex:1}}>
     <FlatList
      data={...}
      horizontal
      pagingEnabled
      keyExtractor={...}
      renderItem={...}
      onMomentumScrollEnd={(event) => {
        const index = Math.floor(
            Math.floor(event.nativeEvent.contentOffset.x) /
            Math.floor(event.nativeEvent.layoutMeasurement.width)
        );
        // work with: index
      }}
    />
   </View>
  )
}

export default GetCurrentIndexFlatList;


