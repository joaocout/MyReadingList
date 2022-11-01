import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";

type EmptyListMessageProps = {
  message: string;
};

export default function EmptyListMessage({ message }: EmptyListMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>It's so empty here...</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
