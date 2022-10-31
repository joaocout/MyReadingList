import { StyleSheet } from "react-native";

import { COLORS } from "../../shared/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  listContentContainer: {
    flexGrow: 1,
    padding: 10,
    paddingVertical: 20,
  },

  emptyBookshelfContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
  },

  emptyBookshelfText: {
    color: COLORS.GRAY,
    textAlign: "center",
  },
});
