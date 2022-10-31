import { StyleSheet } from "react-native";

import { COLORS } from "../../shared/constants";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    margin: 20,
    borderColor: COLORS.LIGHTGRAY,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    paddingVertical: 5,
  },
});
