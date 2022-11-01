import React from "react";
import { View, ActivityIndicator } from "react-native";

import { COLORS } from "../../shared/constants";
import { styles } from "./styles";

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={COLORS.ACCENT} />
    </View>
  );
}
