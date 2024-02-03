import {
  StyleSheet,
  View,
  Button,
  Vibration,
  SafeAreaView,
} from "react-native";
import Timer, { TIME_CONSTANTS } from "./src/features/timer/timer";
import colors from "./src/utils/colors";
import Timing from "./src/features/timer/timing";
import { useEffect, useState } from "react";
import Focus from "./src/features/focus/focus";

export default function App() {
  const [initialTime, setInitialTime] = useState(2000);
  const [isStarted, setIsStarted] = useState(false);
  const [isFocusing, setIsFocusing] = useState(false);
  const [focusingSubject, setFocusingSubject] = useState("");

  const updateInitialTime = (newInitialTime) => setInitialTime(newInitialTime);

  const toggleIsStarted = () => setIsStarted((prevValue) => !prevValue);

  useEffect(() => {
    if (initialTime === 0) {
      setIsStarted(false);

      const intervalId = setInterval(() => {
        Vibration.vibrate();
      }, 2000 * TIME_CONSTANTS.millisecond);

      setTimeout(() => clearInterval(intervalId), 10 * TIME_CONSTANTS.second);
    }
  }, [initialTime]);

  return (
    <>
      {isFocusing ? (
        <>
          <View style={styles.timerContainer}>
            <Timer
              isStarted={isStarted}
              initialTime={initialTime || 10 * TIME_CONSTANTS.minute}
              updateInitialTime={updateInitialTime}
            />
          </View>
          <View style={styles.timingContainer}>
            <Timing updateInitialTime={updateInitialTime} />
          </View>
          <View style={styles.startBtnContainer}>
            <View style={styles.startBtn}>
              <Button
                title={isStarted ? "Stop" : "Start"}
                onPress={() => toggleIsStarted()}
              />
            </View>
          </View>
        </>
      ) : (
        <SafeAreaView style={styles.focusingContainer}>
          <Focus
            setCurrentSubject={(subject) => setFocusingSubject(subject)}
            onPressHandler={toggleIsStarted}
          />
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    flex: 0.5,
    color: colors.white,
    backgroundColor: colors.darkBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  timingContainer: {
    flex: 0.3,
    color: colors.white,
    backgroundColor: colors.darkBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  focusingContainer: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  startBtnContainer: {
    flex: 0.2,
    backgroundColor: colors.darkBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  startBtn: {
    backgroundColor: colors.purple,
    width: 300,
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
  },
});
