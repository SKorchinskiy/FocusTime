import {FlatList, StyleSheet, View, Text} from 'react-native';
import sizes from '../../utils/sizes';
import colors from '../../utils/colors';

function HistoryItem({item, index}) {
  return (
    <View>
      <Text style={styles.historyItem(item.completed)}>{item.subject}</Text>
    </View>
  );
}

export default function FocusHistory({listTitle, historyList}) {
  return (
    <View style={styles.focusHistory}>
      <Text style={styles.listTitle}>{listTitle}</Text>
      <FlatList
        style={styles.historyItemList}
        data={historyList}
        renderItem={HistoryItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  focusHistory: {
    flex: 0.9,
    width: '80%',
    backgroundColor: colors.purple,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTitle: {
    marginTop: 15,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: sizes.md,
    marginBottom: 15,
  },
  historyItemList: {
    width: '70%',
    textAlign: 'center',
  },
  historyItem: completed => ({
    backgroundColor: completed ? 'green' : 'red',
    height: 30,
    color: colors.white,
    fontSize: sizes.lg,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  }),
});
