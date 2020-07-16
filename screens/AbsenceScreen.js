import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Switch,
  FlatList,
  TouchableHighlight,
  Alert,
} from 'react-native';

import {Icon} from 'react-native-elements';

import db from '../helpers/Sqlite';
import SwipeableItem from '../components/SwipeableItem';

const AbsenceScreen = props => {
  const etudiant = props.route.params.etudiant;
  const [absences, setAbsences] = useState([]);
  useEffect(() => {
    db.fetchAbsences(etudiant.cne, receiveAbsences); //.then(res => console.log(res));
    // console.log(etudiant);
    return () => {};
  }, []);

  const receiveAbsences = absences => {
    setAbsences(absences);
  };
  //   console.log(absences);
  const deleteAbsence = absence_id => {
    db.deleteAbsence(absence_id).then(
      db.fetchAbsences(etudiant.cne, receiveAbsences),
    );
    // const newAbsences = absences.filter(abs => abs.absence_id !== absence_id);
    // setAbsences(newAbsences);
  };
  const dateFromMilliseconds = ms => {
    let date = new Date(ms);
    console.log(date);
    const format = str => (('' + str).length === 1 ? '0' + str : str);
    return (
      date.getFullYear() +
      '-' +
      format(date.getMonth()) +
      '-' +
      format(date.getDate()) +
      ' ' +
      format(date.getHours()) +
      ':' +
      format(date.getMinutes())
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name={'chevron-left'}
          style={{...styles.bigText, ...styles.headerButton}}
          type="material"
          color="white"
          size={30}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <Text style={{...styles.bigText, ...styles.headerTitle}}>
          {etudiant.nom} {etudiant.prenom}
        </Text>
      </View>
      <View style={styles.body}>
        {absences.length < 1 && (
          <Text style={{...styles.centredText}}>
            No absences recorded for this student
          </Text>
        )}
        <FlatList
          data={absences}
          renderItem={({item, index}) => (
            <SwipeableItem
              key={index}
              handlePress={() => {}}
              handleLongPress={() => {}}
              handleDelete={() => deleteAbsence(item.absence_id)}>
              <Text style={styles.bigText}>
                {/* {dateFromMilliseconds(item.date)} */}
                {dateFromMilliseconds(parseInt(item.date))}
              </Text>
            </SwipeableItem>
          )}
          keyExtractor={item => '' + item.absence_id}
        />
      </View>
    </View>
  );
};

export default AbsenceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9B9D9C',
    alignItems: 'center',
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
    // justifyContent: 'flex-start',
    // backgroundColor: 'green',
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
    elevation: 5,
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
  etudiant: {
    backgroundColor: '#01395E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '95%',
    padding: 10,
    marginVertical: 4,
  },
  centredText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 5,
  },
});
