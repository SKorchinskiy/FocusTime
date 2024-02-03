import { View, StyleSheet } from "react-native";
import RoundedButton from "../../components/rounded-button";

export default function Timing({ updateInitialTime = () => {} }) {
  return (
    <View style={styles.timingContainer}>
      <View style={styles.sideTimers}>
        <RoundedButton
          txtContent="10m"
          onPressHandler={() => updateInitialTime("10m")}
        />
      </View>
      <View>
        <RoundedButton
          txtContent="15m"
          onPressHandler={() => updateInitialTime("15m")}
        />
      </View>
      <View style={styles.sideTimers}>
        <RoundedButton
          txtContent="20m"
          onPressHandler={() => updateInitialTime("20m")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timingContainer: {
    flex: 1,
    flexDirection: "row",
  },
  sideTimers: {
    position: "relative",
    top: 50,
  },
});
