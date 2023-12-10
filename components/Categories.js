import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoriesCard from "./CategoriesCard";
import client from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type == 'category']
    `
      )
      .then((data) => setCategories(data));
  }, []);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      {categories?.map((category) => (
        <CategoriesCard
          key={category._id}
          title={category.name}
          imgUrl={category.imageCategories}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
