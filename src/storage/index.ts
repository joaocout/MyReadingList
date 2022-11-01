import AsyncStorage from "@react-native-async-storage/async-storage";

import type { BookshelfItem } from "../shared/types";

const KEY = "@books";

type getBooksFromStorageResponse = {
  data: BookshelfItem[];
  error: boolean;
};

async function getBooksFromStorage(): Promise<getBooksFromStorageResponse> {
  try {
    const data = await AsyncStorage.getItem(KEY);
    if (data) return { data: JSON.parse(data), error: false };
    return { data: [], error: false };
  } catch (error) {
    return { data: [], error: true };
  }
}

type setBooksInStorageResponse = {
  error: boolean;
};

async function setBooksInStorage(
  books: BookshelfItem[]
): Promise<setBooksInStorageResponse> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(books));
    return { error: false };
  } catch (error) {
    return { error: true };
  }
}

export { getBooksFromStorage, setBooksInStorage };
