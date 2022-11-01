import React, { useEffect, useState } from "react";
import { View, FlatList, ListRenderItem, Alert, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import { selectBooks } from "../../redux/store";
import {
  remove,
  moveDown,
  moveUp,
  changeProgress,
  setBooks,
} from "../../redux/slices/bookshelfSlice";

import { getBooksFromStorage, setBooksInStorage } from "../../storage";
import BookshelfBookCard from "../../components/BookshelfBookCard";

import { styles } from "./styles";

import type { BookshelfItem } from "../../shared/types";
import EmptyListMessage from "../../components/EmptyListMessage";
import Loading from "../../components/Loading";

export default function Bookshelf() {
  const bookShelfBooks = useSelector(selectBooks);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  // when we update the global state, we also want to update the localstorage
  useEffect(() => {
    const setData = async () => {
      const { error } = await setBooksInStorage(bookShelfBooks);
    };

    bookShelfBooks.length && setData();
  }, [bookShelfBooks]);

  // when this page first loads, we try to copy the data from localstorage to the global state
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await getBooksFromStorage();

      !error && dispatch(setBooks(data));

      setLoading(false);
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
      {loading ? (
        <Loading />
      ) : bookShelfBooks.length ? (
        <FlatList
          data={bookShelfBooks}
          renderItem={renderItem}
          contentContainerStyle={styles.listContentContainer}
        />
      ) : (
        <EmptyListMessage message="Go to the Search page using the search icon below and add some books to your bookshelf!" />
      )}
    </View>
  );
}
