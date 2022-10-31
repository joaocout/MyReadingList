import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import Toast from "react-native-root-toast";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../shared/constants";
import { styles } from "./styles";

import type { SearchItem } from "../../shared/types";

type BookCardProps = {
  bookInfo: SearchItem;
  onAdd: () => void;
  onAddMessage: string;
  onMoreInfo: (id: string) => void;
  alreadyInBookShelf: boolean;
  onRemove: () => void;
  onRemoveMessage: string;
};

export default function BookCard({
  bookInfo,
  onAdd,
  onAddMessage,
  onRemove,
  onRemoveMessage,
  alreadyInBookShelf,
}: BookCardProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        style={[
          styles.img,
          // width is calculated here, inside the component
          { width: width / 3 },
          // if there's no thumbnail available, a lightgray rectangle should be displayed
        ]}
        source={{ uri: bookInfo.thumb }}
      />
      <View style={styles.infoContainer}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.title}>{bookInfo.title}</Text>
          {bookInfo.authors ? (
            <Text style={styles.authors}>{bookInfo.authors}</Text>
          ) : null}
        </View>
        <View style={styles.infoButtonsContainer}>
          <TouchableOpacity
            style={styles.buttonAddToShelf}
            onPress={() => {
              const message = alreadyInBookShelf
                ? onRemoveMessage
                : onAddMessage;
              if (alreadyInBookShelf) onRemove();
              else onAdd();
              Toast.show(message, {
                position: Toast.positions.CENTER,
                hideOnPress: true,
              });
            }}
          >
            <Ionicons
              style={{ marginRight: 5 }}
              name={
                alreadyInBookShelf
                  ? "checkmark-circle"
                  : "checkmark-circle-outline"
              }
              size={22}
              color={COLORS.ACCENT}
            />
            <Text style={styles.buttonAddToShelfText}>
              {alreadyInBookShelf ? "added to bookshelf!" : "add to bookshelf"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
