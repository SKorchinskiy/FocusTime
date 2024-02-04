import {
  StyleSheet,
  View,
  Text,
  Button,
  Vibration,
  SafeAreaView,
} from 'react-native';
import Timer, {TIME_CONSTANTS} from './src/features/timer/timer';
import colors from './src/utils/colors';
import Timing from './src/features/timer/timing';
import {useEffect, useState} from 'react';
import Focus from './src/features/focus/focus';
import sizes from './src/utils/sizes';
import ProgressBar from './src/components/progress-bar';
import FocusHistory from './src/features/focus/focus-history';

export default function App() {
  const [initialTime, setInitialTime] = useState(TIME_CONSTANTS.second);
  const [currentTime, setCurrentTime] = useState(1000);
  const [isStarted, setIsStarted] = useState(false);
  const [isFocusing, setIsFocusing] = useState(false);
  const [focusingSubject, setFocusingSubject] = useState('');
  const [historyList, setHistoryList] = useState([]);

  const updateCurrentTime = newCurrentTime => setCurrentTime(newCurrentTime);
  const updateInitialTime = newInitialTime => setInitialTime(newInitialTime);

  const toggleIsStarted = () => setIsStarted(prevValue => !prevValue);
  const toggleIsFocusing = () => setIsFocusing(prevValue => !prevValue);

  useEffect(() => {
    if (currentTime === 0) {
      setIsStarted(false);
      setHistoryList(prevList =>
        prevList.map(item =>
          item.subject === focusingSubject ? {...item, completed: true} : item,
        ),
      );

      const intervalId = setInterval(() => {
        Vibration.vibrate();
      }, 2000 * TIME_CONSTANTS.millisecond);

      setTimeout(() => {
        clearInterval(intervalId);
        toggleIsFocusing();
      }, 10 * TIME_CONSTANTS.second);
    }
  }, [currentTime]);

  useEffect(() => {
    setCurrentTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    setIsStarted(false);
    setInitialTime(TIME_CONSTANTS.minute);
    setCurrentTime(TIME_CONSTANTS.minute);
    if (isFocusing)
      setHistoryList(prevList =>
        [...prevList].concat({subject: focusingSubject, completed: false}),
      );
  }, [isFocusing]);

  return (
    <>
      {isFocusing ? (
        <>
          <View style={styles.timerContainer}>
            <Timer
              isStarted={isStarted}
              currentTime={currentTime}
              updateCurrentTime={updateCurrentTime}
            />
            <Text style={styles.focusTextContainer}>
              Focusing on: {focusingSubject}
            </Text>
            <ProgressBar startValue={initialTime} currentValue={currentTime} />
          </View>
          <View style={styles.timingContainer}>
            <Timing updateInitialTime={updateInitialTime} />
          </View>
          <View style={styles.btnContainer}>
            <View style={styles.startBtn}>
              <Button
                title={isStarted ? 'Stop' : 'Start'}
                onPress={toggleIsStarted}
              />
            </View>
            <View style={styles.interruptBtn}>
              <Button title={'Interrupt'} onPress={toggleIsFocusing} />
            </View>
          </View>
        </>
      ) : (
        <SafeAreaView style={styles.focusingContainer}>
          <Focus
            setCurrentSubject={subject => setFocusingSubject(subject)}
            onPressHandler={toggleIsFocusing}
          />
          <FocusHistory
            listTitle={
              historyList.length
                ? "Subjects you've focused on:"
                : "You haven't focused yet"
            }
            historyList={historyList}
          />
          <View style={styles.interruptBtn}>
            <Button
              title={'Clear History'}
              onPress={() => setHistoryList([])}
            />
          </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingContainer: {
    flex: 0.2,
    color: colors.white,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusingContainer: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
  },
  focusTextContainer: {
    width: '100%',
    textAlign: 'center',
    color: colors.purple,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: sizes.md,
    backgroundColor: colors.darkBlue,
    marginTop: 50,
  },
  btnContainer: {
    flex: 0.3,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtn: {
    backgroundColor: colors.purple,
    width: 300,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
  interruptBtn: {
    marginTop: 20,
    backgroundColor: colors.purple,
    width: 300,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
});
