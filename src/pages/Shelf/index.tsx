import React, { useEffect } from "react";
import { View, FlatList, ListRenderItem, Alert } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { selectBooks } from "../../redux/store";
import { remove, moveDown, moveUp } from "../../redux/slices/bookshelfSlice";

import BookshelfBookCard from "../../components/BookshelfBookCard";

import { styles } from "./styles";

import type { BookshelfItem } from "../../shared/types";

export default function Bookshelf() {
  const bookShelfBooks = useSelector(selectBooks);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

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
      onChangeProgress={() => null}
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
