import { View, TextInput, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import RoundedButton from "../../components/rounded-button";
import sizes from "../../utils/sizes";

export default function Focus({
  setCurrentSubject = () => {},
  onPressHandler = () => {},
}) {
  return (
    <View style={styles.focusContainer}>
      <View style={styles.subjectInputContainer}>
        <TextInput
          placeholder="Enter focusing subject name..."
          placeholderTextColor={colors.black}
          onTextInput={setCurrentSubject}
        />
      </View>
      <RoundedButton
        txtContent="+"
        btnContainerStyle={{ height: 50, padding: sizes.sm, borderRadius: 10 }}
        onPressHandler={onPressHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  focusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    width: "100%",
    height: 60,
  },
  subjectInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.purple,
    width: 250,
    height: 50,
    color: colors.black,
    borderRadius: 10,
  },
});
