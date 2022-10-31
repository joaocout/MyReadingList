import React, { useEffect, useState } from "react";
import { View, FlatList, ListRenderItem, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import { selectBooks } from "../../redux/store";
import {
  remove,
  moveDown,
  moveUp,
  changeProgress,
  retrieveBooks,
} from "../../redux/slices/bookshelfSlice";

import BookshelfBookCard from "../../components/BookshelfBookCard";

import { styles } from "./styles";

import type { BookshelfItem } from "../../shared/types";

export default function Bookshelf() {
  const bookShelfBooks = useSelector(selectBooks);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  // when we update the redux state, we also want to update the localstorage
  useEffect(() => {
    console.log("setData to storage");
    const setData = async () => {
      try {
        await AsyncStorage.setItem("@books", JSON.stringify(bookShelfBooks));
      } catch (error) {
        console.log(error);
      }
    };
    bookShelfBooks.length && setData();
  }, [bookShelfBooks]);

  // when this page first loads, we try to get Data from localstorage
  useEffect(() => {
    console.log("getData form storage");
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem("@books");
        data !== null ? dispatch(retrieveBooks(JSON.parse(data))) : null;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const renderItem: ListRenderItem<BookshelfItem> = ({ item, index }) => (
    <BookshelfBookCard
      isLast={index === bookShelfBooks.length - 1}
      isFirst={index === 0}
      book={item}
      onRemove={() => {
        Alert.alert(
          "Removing book from bookshelf",
          `Are you sure you want to remove ${item.title} from your bookshelf?`,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "I'm sure",
              onPress: () => {
                dispatch(remove(item.id));
              },
            },
          ]
        );
      }}
      onMoveDown={() => {
        dispatch(moveDown(item.id));
      }}
      onMoveUp={() => dispatch(moveUp(item.id))}
      onChangeProgress={() => dispatch(changeProgress(item.id))}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookShelfBooks}
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
}
