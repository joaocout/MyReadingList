import Toast from "react-native-root-toast";

const MESSAGE = "An error ocurred! Please, try again later.";

export default function ToastError() {
  return Toast.show(MESSAGE, { position: Toast.positions.CENTER });
}
