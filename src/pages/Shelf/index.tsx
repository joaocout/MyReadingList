import React from "react";
import { View } from "react-native";

import Animated from "react-native-reanimated";
import { useDispatch } from "react-redux";

import { useToastError } from "../../hooks/useToastError";
import { useListMountingAnimation } from "../../hooks/useListMountingAnimation";
import { useStorageBooks } from "../../hooks/useStorageBooks";
import {
  remove,
  moveDown,
  moveUp,
  changeProgress,
} from "../../redux/slices/bookshelfSlice";

import BookshelfBookCard from "../../components/BookshelfBookCard";
import EmptyListMessage from "../../components/EmptyListMessage";
import Loading from "../../components/Loading";

import { styles } from "./styles";

import type { Book } from "../../shared/types";

export default function Bookshelf() {
  const dispatch = useDispatch();

  const { books, loading, error } = useStorageBooks();

  const animatedStyle = useListMountingAnimation(loading);

  useToastError(error);

  const renderItem = ({ item, index }: { item: Book; index: number }) => (
    <BookshelfBookCard
      key={item.id}
      isLast={index === books.length - 1}
      isFirst={index === 0}
      book={item}
      onRemove={() => {
        dispatch(remove(item.id));
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
      ) : books.length ? (
        <Animated.ScrollView
          style={animatedStyle}
          contentContainerStyle={styles.listContentContainer}
        >
          {books.map((item, index) => renderItem({ item, index }))}
        </Animated.ScrollView>
      ) : (
        <EmptyListMessage message="Go to the Search page using the search icon below and add some books to your bookshelf!" />
      )}
    </View>
  );
}
