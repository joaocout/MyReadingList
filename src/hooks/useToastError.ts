import { useEffect } from "react";

import Toast from "react-native-root-toast";

const MESSAGE = "An error ocurred! Please, try again later.";

export function useToastError(show: boolean) {
  useEffect(() => {
    show && Toast.show(MESSAGE, { position: Toast.positions.CENTER });
  }, [show]);
}
