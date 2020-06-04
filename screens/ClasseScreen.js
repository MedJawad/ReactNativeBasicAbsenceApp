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

const ClasseScreen = props => {
  const classe = props.route.params.classe;
  const [etudiants, setEtudiants] = useState([]);

  const receiveEtudiants = etds => {
    // console.log(etds);
    etds = [...etds];
    etds.map(etd => {
      etd.isPresent = true;
      return etd;
    });
    setEtudiants(etds);
  };
  useEffect(() => {
    db.fetchEtudiants(classe.nom, receiveEtudiants); //.then(res => console.log(res));

    return () => {};
  }, []);

  const toggleSwitch = index => {
    const newEtudiants = [...etudiants];
    newEtudiants[index].isPresent = !newEtudiants[index].isPresent;
    setEtudiants(newEtudiants);
  };
  const saveAbsences = () => {
    let absents = etudiants
      .filter(etd => etd.isPresent === false)
      .map(etd => etd.cne);
    db.saveAbsences(absents);
    // console.log(absents);
  };
  // console.log(etudiants);
  const deleteStudent = cne => {
    const newEtudiants = etudiants.filter(etd => etd.cne !== cne);
    setEtudiants(newEtudiants);
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
          {classe.nom}
        </Text>
      </View>
      <View style={styles.body}>
        <FlatList
          data={etudiants}
          renderItem={({item, index}) => (
            //onLongPress
            <SwipeableItem
              key={index}
              handlePress={() => toggleSwitch(index)}
              handleLongPress={() => {
                props.navigation.navigate('Absences', {
                  etudiant: item,
                });
              }}
              handleDelete={() => deleteStudent(item.cne)}>
              <Text style={styles.bigText}>
                {item.nom} {item.prenom}
              </Text>
              <Switch
                onValueChange={() => toggleSwitch(index)}
                value={item.isPresent}
                thumbColor="#CDA3A4"
              />
            </SwipeableItem>
          )}
          keyExtractor={item => '' + item.cne}
        />
      </View>
      <View style={styles.footer}>
        {/* <Button title="ENREGISTRER" color="#CDA3A4" style={styles.footButton} /> */}
        <TouchableHighlight
          style={{...styles.footButton}}
          onPress={saveAbsences}
          underlayColor="#01394E">
          <Text style={{...styles.bigText, ...styles.footButtonText}}>
            ENREGISTRER
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ClasseScreen;

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
});
