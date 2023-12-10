import { View, Image, Text, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type == 'featured'] {
          ...,
          restaurants[] -> {
            ...,
            dishes[] ->,
          }
        }
    `
      )
      .then((data) => setFeaturedCategories(data));
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="text-red-300">
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="w-7 h-7 bg-gray-300 p-4 rounded-full"
          />

          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">
              Deliver Now!
            </Text>
            <View className="flex-row items-center gap-1">
              <Text className="font-bold text-xl">Current Location</Text>
              <ChevronDownIcon size={20} color="#00ccbb" />
            </View>
          </View>
          <UserIcon size={35} color="#00ccbb" />
        </View>
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
          <View className="flex-row flex-1 items-center space-x-2 bg-[#F3F4F6] p-3 rounded-full">
            <MagnifyingGlassIcon size={20} color="gray" />
            <TextInput
              placeholder="Restraunt and cusiens"
              keyboardType="default"
              className="outline-none placeholder:text-gray-500"
            />
          </View>
          <AdjustmentsVerticalIcon color="#00ccbb" />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            paddingBottom: 250,
          }}
          className="bg-gray-100"
        >
          <Categories />

          {featuredCategories?.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
