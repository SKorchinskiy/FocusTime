import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import sizes from "../../utils/sizes";

export const TIME_CONSTANTS = {
  millisecond: 1,
  second: 1000,
  minute: 60 * 1000,
};

function formatTime(timeInMillis) {
  const minutes = Math.floor(timeInMillis / TIME_CONSTANTS.minute);
  const seconds =
    (timeInMillis % TIME_CONSTANTS.minute) / TIME_CONSTANTS.second;

  return `${minutes >= 10 ? "" : "0"}${minutes}:${
    seconds >= 10 ? "" : "0"
  }${seconds}`;
}

function parseInitialTime(initialTime) {
  if (typeof initialTime === "undefined") return 10 * TIME_CONSTANTS.second;
  if (typeof initialTime === "number") return initialTime;
  try {
    const [timeValue, timeType] = [
      initialTime.slice(0, initialTime.length - 1),
      initialTime[initialTime.length - 1],
    ];

    const timeInSec =
      timeType === "s"
        ? parseInt(timeValue) * TIME_CONSTANTS.second
        : parseInt(timeValue) * TIME_CONSTANTS.minute;

    return timeInSec;
  } catch (e) {
    return 10 * TIME_CONSTANTS.second;
  }
}

export default function Timer({
  initialTime = "6s",
  isStarted = false,
  updateInitialTime = () => {},
}) {
  const [expirationTime, setExpirationTime] = useState(
    parseInitialTime(initialTime)
  );
  const intervalId = useRef(null);

  useEffect(() => {
    setExpirationTime(parseInitialTime(initialTime));

    if (expirationTime > 0) {
      if (intervalId.current) clearInterval(intervalId.current);

      if (isStarted) {
        const timerId = setInterval(
          () => setExpirationTime((value) => value - TIME_CONSTANTS.second),
          TIME_CONSTANTS.second
        );
        intervalId.current = timerId;
      }
    }
  }, [initialTime, isStarted]);

  useEffect(() => {
    if (expirationTime === 0) clearInterval(intervalId.current);
    if (parseInitialTime(initialTime) !== expirationTime)
      updateInitialTime(expirationTime);
  }, [expirationTime]);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerTime}>{formatTime(expirationTime)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: colors.purple,
    borderRadius: "10",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 150,
  },
  timerTime: {
    fontSize: sizes.xl,
    color: colors.white,
    fontWeight: "bold",
  },
});
