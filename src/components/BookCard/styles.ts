import { Dimensions, StyleSheet, useWindowDimensions } from "react-native";

import { COLORS } from "../../shared/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.WHITESMOKE,
  },

  img: {
    aspectRatio: 128 / 184,
    resizeMode: "contain",
    backgroundColor: COLORS.WHITESMOKE,
  },

  infoContainer: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: "stretch",
    alignItems: "center",
    paddingVertical: 5,
    justifyContent: "space-between",
  },

  infoTextContainer: {
    flexShrink: 1,
    alignItems: "center",
    marginBottom: 5,
  },

  infoButtonsContainer: {
    flexShrink: 1,
    alignItems: "center",
  },

  title: {
    color: COLORS.BLACK,
    textAlign: "center",
    fontWeight: "bold",
  },

  authors: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.GRAY,
  },

  buttonText: {
    color: COLORS.ACCENT,
    fontWeight: "bold",
  },

  buttonAddToShelf: {
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonAddToShelfText: {
    flexShrink: 1,
    color: COLORS.ACCENT,
    textAlign: "left",
  },
});
