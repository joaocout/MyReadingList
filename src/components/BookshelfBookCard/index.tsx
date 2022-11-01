import React from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Linking,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../shared/constants";
import { styles } from "./styles";

import type { BookshelfItem } from "../../shared/types";

type BookshelfBookCardProps = {
  isLast: boolean;
  isFirst: boolean;
  book: BookshelfItem;
  onRemove: () => void;
  onChangeProgress: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

export default function BookshelfBookCard({
  isLast,
  isFirst,
  book,
  onRemove,
  onMoveUp,
  onMoveDown,
  onChangeProgress,
}: BookshelfBookCardProps) {
  const { width } = useWindowDimensions();

  return (
    <View
      style={[
        styles.container,
        // when the book is marked as finished, its card will appear faded
        book.progress === "completed" ? { opacity: 0.3 } : null,
      ]}
    >
      <View style={styles.bookInfoContainer}>
        <Image
          source={{ uri: book.thumb }}
          style={{
            backgroundColor: COLORS.WHITESMOKE,
            aspectRatio: 128 / 184,
            width: width / 3,
          }}
        />
        <View style={styles.sideContainer}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.authors}>{book.authors}</Text>
          <TouchableOpacity
            style={styles.sideContainerButton}
            onPress={onRemove}
          >
            <Ionicons
              name="remove-circle-outline"
              size={22}
              color={COLORS.ACCENT}
              style={styles.sideContainerButtonImg}
            />
            <Text style={styles.sideContainerButtonText}>
              remove from bookshelf
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sideContainerButton}
            onPress={() => Linking.openURL(book.link)}
          >
            <Ionicons
              style={styles.sideContainerButtonImg}
              name="logo-google"
              size={22}
              color={COLORS.ACCENT}
            />
            <Text style={styles.sideContainerButtonText}>see it on Google</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        {/* if this is the last element, it shouldn't be able to move down */}
        <View style={styles.moveBookButtonsContainer}>
          <TouchableOpacity
            style={styles.moveBookButton}
            disabled={isLast}
            onPress={onMoveDown}
          >
            <Ionicons
              name="chevron-down-circle-outline"
              size={22}
              color={isLast ? COLORS.LIGHTGRAY : COLORS.ACCENT}
            />
          </TouchableOpacity>
          {/* if this is the first element, it shouldn't be able to move up */}
          <TouchableOpacity
            style={styles.moveBookButton}
            disabled={isFirst}
            onPress={onMoveUp}
          >
            <Ionicons
              name="chevron-up-circle-outline"
              size={22}
              color={isFirst ? COLORS.LIGHTGRAY : COLORS.ACCENT}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.progressButtonContainer}
          onPress={onChangeProgress}
        >
          <Ionicons
            name={book.progress === "new" ? "book-outline" : "book"}
            size={22}
            color={COLORS.ACCENT}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.progressButtonText}>
            {book.progress === "new"
              ? "want to read it!"
              : book.progress === "reading"
              ? "reading..."
              : "finsished!"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
