import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Modal} from 'react-native';
import {addClasse} from '../helpers/DocumentPicker';
import db from '../helpers/Sqlite';
import {TouchableHighlight} from 'react-native-gesture-handler';
import RNBootSplash from 'react-native-bootsplash';
import SwipeableItem from '../components/SwipeableItem';

const HomeScreen = props => {
  RNBootSplash.hide({duration: 500});

  const [classes, setClasses] = useState([]);
  const [modalVisible, setModalVisible] = useState({
    visibility: false,
    message: '',
  });
  function uniqClassesByName(classes) {
    return [...new Map(classes.map(c => [c.nom, c])).values()];
  }

  useEffect(() => {
    db.fetchClasses(receiveClasses); //.finally(RNBootSplash.hide({duration: 250})); //.then(res => console.log(res));
    return () => {};
  }, []);
  const receiveClasses = classes => {
    // console.log(classes);
    setClasses(classes);
  };
  const deleteClasse = classeNom => {
    db.deleteClasse(classeNom).then(db.fetchClasses(receiveClasses));
  };

  const handleAddClasse = () => {
    addClasse()
      .then(res => {
        if (res.students.length === 0)
          return setModalVisible({
            ...modalVisible,
            visibility: true,
            message: "File Doesn't contain any students !",
          });
        // console.log(res);
        newClasses = [...classes, res];
        newClasses = uniqClassesByName(newClasses);
        if (newClasses.length === classes.length)
          //AKA if the class added already exists in the classes array
          return setModalVisible({
            ...modalVisible,
            visibility: true,
            message: 'Classe already exists !',
          });
        setClasses(newClasses);
        return res;
      })
      .then(classe => classe && db.saveClasse(classe));
  };

  const handleClassePress = classe => {
    props.navigation.navigate('Classe', {
      classe,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bigText}>
          Bienvenue dans l'application de gestion d'absence
        </Text>
        <Text style={styles.bigText}>
          par: <Text style={styles.nomText}>Aatafay Mohamed Jawad</Text>
        </Text>
      </View>
      <View style={styles.body}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible.visibility}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalVisible.message}</Text>

              <Button
                style={{...styles.openButton}}
                color="#01395E"
                title="Exit"
                onPress={() => {
                  return setModalVisible({...modalVisible, visibility: false});
                }}
              />
            </View>
          </View>
        </Modal>
        {/* {classes.length === 0 && (
          <Button
            title="Ajouter une classe pour continuer"
            color="#01395E"
            style={styles.addButton}
            onPress={handleAddClasse}
          />
        )} */}
        {/* <TouchableHighlight
            style={{...styles.roundButton, ...styles.classeButton}}
            key={c.nom}
            onPress={() => handleClassePress(c)}>
            <Text style={styles.bigText}>{c.nom}</Text>
          </TouchableHighlight> */}
        {classes.map((c, index) => (
          <SwipeableItem
            key={c.nom}
            handlePress={() => handleClassePress(c)}
            handleDelete={() => deleteClasse(c.nom)}>
            <Text style={styles.bigText}>{c.nom}</Text>
          </SwipeableItem>
        ))}
      </View>
      <View style={styles.footer}>
        {/* {classes.length === 0 || (
          <Button
            title=""
            color="#01395E"
            style={styles.addButton}
            
          />
        )} */}
        <TouchableHighlight
          style={{...styles.roundButton, ...styles.addButton}}
          onPress={handleAddClasse}
          underlayColor="#01394E">
          <Text style={styles.bigText}>+ Ajouter une nouvelle classe</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9B9D9C',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#01395E',
    paddingVertical: 20,
    width: '100%',
    textAlign: 'center',
  },
  body: {
    width: '90%',
  },
  bigText: {
    color: '#EFE3D7',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  nomText: {
    color: '#CDA3A4',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  classeButton: {
    marginBottom: 5,
    width: '100%',
    backgroundColor: '#01395E',
    padding: 10,
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    // height: "50",
  },
  addButton: {
    // flex: 1,
    margin: 20,
    width: '90%',
    backgroundColor: '#01395E',
    padding: 10,
    alignItems: 'center',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
