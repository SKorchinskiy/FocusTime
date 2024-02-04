import {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../utils/colors';
import sizes from '../../utils/sizes';

export const TIME_CONSTANTS = {
  millisecond: 1,
  second: 1000,
  minute: 60 * 1000,
};

function formatTime(timeInMillis) {
  const minutes = Math.floor(timeInMillis / TIME_CONSTANTS.minute);
  const seconds =
    (timeInMillis % TIME_CONSTANTS.minute) / TIME_CONSTANTS.second;

  return `${minutes >= 10 ? '' : '0'}${minutes}:${
    seconds >= 10 ? '' : '0'
  }${seconds}`;
}

function parseTime(currentTime) {
  if (typeof currentTime === 'undefined') return 10 * TIME_CONSTANTS.second;
  if (typeof currentTime === 'number') return currentTime;
  try {
    const [timeValue, timeType] = [
      currentTime.slice(0, currentTime.length - 1),
      currentTime[currentTime.length - 1],
    ];

    const timeInSec =
      timeType === 's'
        ? parseInt(timeValue) * TIME_CONSTANTS.second
        : parseInt(timeValue) * TIME_CONSTANTS.minute;

    return timeInSec;
  } catch (e) {
    return 10 * TIME_CONSTANTS.second;
  }
}

export default function Timer({
  currentTime = '60s',
  isStarted = false,
  updateCurrentTime = () => {},
}) {
  const [expirationTime, setExpirationTime] = useState(parseTime(currentTime));
  const intervalId = useRef(null);

  useEffect(() => {
    setExpirationTime(parseTime(currentTime));

    if (expirationTime > 0) {
      if (intervalId.current) clearInterval(intervalId.current);

      if (isStarted) {
        const timerId = setInterval(
          () => setExpirationTime(value => value - TIME_CONSTANTS.second),
          TIME_CONSTANTS.second,
        );
        intervalId.current = timerId;
      }
    }
  }, [currentTime, isStarted]);

  useEffect(() => {
    if (expirationTime === 0) clearInterval(intervalId.current);
    if (parseTime(currentTime) !== expirationTime)
      updateCurrentTime(expirationTime);
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
    borderRadius: '10',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 150,
  },
  timerTime: {
    fontSize: sizes.xl,
    color: colors.white,
    fontWeight: 'bold',
  },
});
