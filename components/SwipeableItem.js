import React from 'react';
import {Switch, TouchableHighlight} from 'react-native-gesture-handler';
import {
  Text,
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Easing,
} from 'react-native';

const SwipeableItem = ({
  children,
  handlePress,
  handleLongPress,
  handleDelete,
}) => {
  // const pan = React.useRef(new Animated.ValueXY()).current;
  const xTrans = React.useRef(new Animated.Value(0.01)).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gesture) => {
        return Math.abs(gesture.dx) > 5;
      },
      onPanResponderMove: Animated.event([null, {dx: xTrans}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        if (xTrans._value < 250) {
          Animated.timing(xTrans, {
            toValue: 0.01,
            duration: 500,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(xTrans, {
            toValue: 1000,
            duration: 500,
            useNativeDriver: true,
          }).start(handleDelete);
        }
      },
    }),
  ).current;

  return (
    <View>
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}>
        <View
          style={{
            ...styles.roundButton,
            ...styles.deleteView,
          }}>
          <Text style={{...styles.bigText, textAlign: 'left'}}>Delete</Text>
        </View>
      </View>
      <Animated.View
        style={{
          transform: [{translateX: xTrans}, {translateY: 0}],
        }}
        {...panResponder.panHandlers}>
        <TouchableHighlight
          underlayColor="#CDA3A4"
          onPress={handlePress}
          onLongPress={handleLongPress}>
          <View
            style={{
              ...styles.roundButton,
              ...styles.item,
            }}>
            {children}
          </View>
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
};

export default SwipeableItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9B9D9C',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#01395E',
    paddingVertical: 20,
    width: '100%',
    textAlign: 'center',
    flexDirection: 'row',
  },
  headerButton: {
    flex: 1,
    marginLeft: 10,
  },
  headerTitle: {
    flex: 4,
  },
  body: {
    width: '100%',
    marginBottom: 50,
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  footButton: {
    width: '100%',
    backgroundColor: '#01395E',
    padding: 10,
    alignItems: 'center',
  },
  footButtonText: {
    color: '#EFE3D7',
  },
  roundButton: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
  },
  bigText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  classeButton: {
    marginBottom: 5,
  },
  scrollview: {
    // width: '100%',
  },
  item: {
    backgroundColor: '#01395E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '95%',
    padding: 10,
    marginVertical: 4,
    // elevation: 2,
  },
  deleteView: {
    backgroundColor: '#CDA3A4',
    width: '95%',
    padding: 10,
    marginVertical: 4,
    // elevation: 1,
  },
});
