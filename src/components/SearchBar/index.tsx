import React from "react";
import { View, TouchableOpacity, TextInput } from "react-native";

import Toast from "react-native-root-toast";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../shared/constants";
import { styles } from "./styles";

type SearchBarProps = {
  onChangeText: (text: string) => void;
  value: string;
  onSubmitSuccess: (text: string) => void;
  submitErrorMessage: string;
};

export default function SearchBar({
  onChangeText,
  value,
  onSubmitSuccess,
  submitErrorMessage,
}: SearchBarProps) {
  const onSubmit = () => {
    // if the query is empty, we should throw an error an let the user know
    if (value.replace(" ", "") === "") {
      Toast.show(submitErrorMessage, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        hideOnPress: true,
      });
    } else {
      onSubmitSuccess(value);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        selectionColor={COLORS.ACCENT}
        placeholderTextColor={COLORS.LIGHTGRAY}
        placeholder="Search for books here!"
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmit}
      />
      <TouchableOpacity onPress={onSubmit}>
        <Ionicons name="search-circle" size={34} color={COLORS.ACCENT} />
      </TouchableOpacity>
    </View>
  );
}
