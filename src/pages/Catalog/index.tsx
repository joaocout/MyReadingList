import React, { useState } from "react";
import { View, ListRenderItem, Text, TouchableOpacity } from "react-native";

import Animated from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { useToastError } from "../../hooks/useToastError";
import { useListMountingAnimation } from "../../hooks/useListMountingAnimation";
import { useSearchBooks } from "../../hooks/useSearchBooks";
import { selectBooks } from "../../redux/store";
import { add, remove } from "../../redux/slices/bookshelfSlice";

import Loading from "../../components/Loading";
import BookCard from "../../components/BookCard";
import EmptyListMessage from "../../components/EmptyListMessage";
import SearchBar from "../../components/SearchBar";

import { COLORS } from "../../shared/constants";
import { styles } from "./styles";

import type { Book } from "../../shared/types";

export default function Catalog() {
  const bookshelfBooks = useSelector(selectBooks);
  const dispatch = useDispatch();

  const [query, onChangeQuery] = useState("");
  const [pageIndex, setPageIndex] = useState(0);

  const { books, loading, totalPages, error, lastSearchedQuery, searchBooks } =
    useSearchBooks(query, pageIndex);

  const animatedStyle = useListMountingAnimation(loading);

  useToastError(error);

  const listFooter = () => {
    // if we are at the first page, the back button should appear disabled
    const prevPageButtonColor =
      pageIndex === 0 ? COLORS.LIGHTGRAY : COLORS.ACCENT;

    // if we are at the last page, the forward button should appear disabled
    const nextPageButtonColor =
      pageIndex >= totalPages ? COLORS.LIGHTGRAY : COLORS.ACCENT;

    return (
      <View style={styles.listFooterContainer}>
        <TouchableOpacity
          onPress={() => setPageIndex((prev) => prev - 1)}
          disabled={pageIndex === 0}
          style={styles.paginationButtonContainer}
        >
          <Text style={{ color: prevPageButtonColor }}>Previous</Text>
          <Ionicons
            name="chevron-back-circle"
            size={34}
            color={prevPageButtonColor}
          />
        </TouchableOpacity>
        <View style={styles.paginationButtonContainer}>
          <Text style={styles.paginationCurrentText}>Page {pageIndex + 1}</Text>
        </View>
        <TouchableOpacity
          disabled={pageIndex === totalPages}
          onPress={() => setPageIndex((prev) => prev + 1)}
          style={styles.paginationButtonContainer}
        >
          <Text style={{ color: nextPageButtonColor }}>Next</Text>
          <Ionicons
            name="chevron-forward-circle"
            size={34}
            color={nextPageButtonColor}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem: ListRenderItem<Book> = ({ item }) => (
    <BookCard
      alreadyInBookShelf={
        bookshelfBooks.findIndex((book) => book.id === item.id) !== -1
      }
      book={item}
      onMoreInfo={() => null}
      onAdd={() => {
        dispatch(add(item));
      }}
      onAddMessage={`${item.title} added to your Bookshelf!`}
      onRemove={() => dispatch(remove(item.id))}
      onRemoveMessage={`${item.title} removed from your Bookshelf!`}
    />
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={query}
        onChangeText={onChangeQuery}
        onSubmitSuccess={() => {
          // we call getData with page 0 because we are doing a new query
          searchBooks();
        }}
        submitErrorMessage={"Cannot search for empty text!"}
      />

      {lastSearchedQuery.length ? (
        <Text style={styles.currentSearchText}>
          Searching for: {lastSearchedQuery}
        </Text>
      ) : null}

      {loading ? (
        <Loading />
      ) : books.length ? (
        <Animated.FlatList
          style={animatedStyle}
          numColumns={2}
          contentContainerStyle={styles.listContentContainer}
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListFooterComponent={listFooter}
        />
      ) : (
        // if no items are beign shown, we suggest the user to search for something
        <EmptyListMessage message="Use the search bar above to search for some books you like!" />
      )}
    </View>
  );
}
