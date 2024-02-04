import { StyleSheet, View } from "react-native";
import colors from "../utils/colors";

export default function ProgressBar({ startValue, currentValue }) {
  return (
    <View style={styles.progressBarContainer}>
      <View
        style={Object.assign(
          { ...styles.progressBar },
          { width: `${(100 * Math.floor(currentValue)) / startValue}%` }
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    width: "100%",
    height: 30,
    backgroundColor: colors.darkerBlue,
  },
  progressBar: {
    width: "100%",
    height: 30,
    backgroundColor: colors.purple,
  },
});
