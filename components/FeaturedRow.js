import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import client, { urlFor } from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [resturant, setResturant] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type == 'featured' && _id == $id] {
          ...,
          restaurants[] -> {
            ...,
            dishes[] ->,
          type -> {
            name
          }
          }
        }[0]
    `,
        { id }
      )
      .then((data) => setResturant(data?.restaurants));
  }, []);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00ccbb" />
      </View>
      <Text className="px-4 text-gray-500 text-xs">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {resturant.map((restaurants) => (
          <RestaurantCard
            key={restaurants._id}
            id={restaurants._id}
            title={restaurants.name}
            imgUrl={urlFor(restaurants.Image).url()}
            long={restaurants.long}
            lat={restaurants.lat}
            rating={restaurants.rating}
            genre={restaurants.type?.name}
            address={restaurants.address}
            shorDescription={restaurants.short_description}
            dishes={restaurants.dishes}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
