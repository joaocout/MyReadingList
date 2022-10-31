import { StyleSheet } from "react-native";

import { COLORS } from "../../shared/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },

  currentSearchText: {
    color: COLORS.GRAY,
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: -10,
  },

  listContentContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingTop: 0,
  },

  listFooterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },

  paginationButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  paginationCurrentText: {
    textAlign: "center",
    color: COLORS.GRAY,
  },
});
