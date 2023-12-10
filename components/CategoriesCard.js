import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'

const CategoriesCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="mr-2 relative">
        <Image
        source={{
            uri: urlFor(imgUrl).width(200).url()
        }}
        className="h-20 w-20 rounded"
         />
      <Text className="font-bold absolute text-white left-1 bottom-1">{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoriesCard