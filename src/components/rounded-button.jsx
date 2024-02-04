import { View, StyleSheet, Button } from "react-native";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export default function RoundedButton({
  txtContent = "",
  btnContainerStyle = {},
  onPressHandler = () => {},
}) {
  return (
    <View
      style={Object.assign(
        Object.assign({}, styles.btnContainer),
        btnContainerStyle
      )}
    >
      <Button title={txtContent} onPress={onPressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    color: colors.white,
    backgroundColor: colors.purple,
    padding: sizes.lg,
    margin: 10,
    borderRadius: 60,
  },
});
