import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../features/basketSlice";

const DishRow = ({ id, description, name, image, price }) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const items= useSelector((state) => selectBasketItemsWithId(state, id));

  const addInBasket = () => {
    dispatch(addToBasket({ id, name, description, image, price }));
  };

  const removeItemsFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-400 ${
          isPressed && `border-b-0`
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">$ {price}</Text>
          </View>
          <View>
            <Image
              source={{
                uri: image,
              }}
              style={{
                borderWidth: 1,
                borderColor: "#f3f3f4",
              }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity disabled={!items.length} onPress={removeItemsFromBasket}>
              <MinusCircleIcon color={items.length > 0 ? "#00ccbb" : "gray"} size={40} />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addInBasket}>
              <PlusCircleIcon color="#00ccbb" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
