import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { getBooks } from "../../api";
import { selectBooks } from "../../redux/store";
import { add, remove } from "../../redux/slices/bookshelfSlice";

import Loading from "../../components/Loading";
import BookCard from "../../components/BookCard";
import EmptyListMessage from "../../components/EmptyListMessage";
import SearchBar from "../../components/SearchBar";

import { COLORS } from "../../shared/constants";
import { styles } from "./styles";

import type { SearchItem } from "../../shared/types";

export default function Catalog() {
  const bookshelfBooks = useSelector(selectBooks);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [lastQuery, setLastQuery] = useState("");
  const [query, onChangeQuery] = useState("");

  const [books, setBooks] = useState<Array<SearchItem>>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // whenever the page changes, we want to rerun getData to update data
  useEffect(() => {
    if (query.length && totalPages) {
      getData(lastQuery, pageIndex);
    }
  }, [pageIndex]);

  const getData = useCallback(async (query: string, page: number) => {
    setLoading(true);
    const {
      books,
      totalPages: totalPagesValue,
      error,
    } = await getBooks(query, page);
    setBooks(books);
    setTotalPages(totalPagesValue);
    setLoading(false);
  }, []);

  const listFooter = () => {
    // if we are at the first page, the back button should appear disabled
    const prevPageButtonColor =
      pageIndex === 0 ? COLORS.LIGHTGRAY : COLORS.ACCENT;

    // if we are at the last page, the forward button should appear disabled
    const nextPageButtonColor =
      pageIndex >= totalPages ? COLORS.LIGHTGRAY : COLORS.ACCENT;

    return (
      // if there are no books loaded, we don't need to render the pagination buttons
      books.length ? (
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
            <Text style={styles.paginationCurrentText}>
              Page {pageIndex + 1}
            </Text>
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
      ) : null
    );
  };

  const renderItem: ListRenderItem<SearchItem> = ({ item }) => (
    <BookCard
      alreadyInBookShelf={
        bookshelfBooks.findIndex((book) => book.id === item.id) !== -1
      }
      bookInfo={item}
      onMoreInfo={() => null}
      onAdd={() => {
        dispatch(
          add({
            id: item.id,
            title: item.title,
            thumb: item.thumb,
            authors: item.authors,
            progress: "new",
            link: item.link,
          })
        );
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
        onSubmitSuccess={(text) => {
          // we call getData with page 0 because we are doing a new query
          getData(text, 0);
          setPageIndex(0);
          setLastQuery(query);
        }}
        submitErrorMessage={"Cannot search for empty text!"}
      />

      {lastQuery.length ? (
        <Text style={styles.currentSearchText}>Searching for: {lastQuery}</Text>
      ) : null}

      {loading ? (
        <Loading />
      ) : books.length ? (
        <FlatList
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
