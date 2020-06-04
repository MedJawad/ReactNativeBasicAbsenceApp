import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {csvJSON} from './CsvToJson';

export const addClasse = () => {
  const classe = {
    nom: '',
    students: [],
  };
  try {
    return DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      // readContent: true,
    }).then(res => {
      // console.log(res);
      classe.nom = res.name.split('.')[0];
      return RNFS.readFile(res.uri, 'utf8')
        .then(result => csvJSON(result, ['CNE', 'NOM', 'PRENOM']))
        .then(json => {
          classe.students = json;
          // console.log(classe);
          return classe;
        });
    });
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
      console.log(err);
    } else {
      throw err;
    }
  }
};

// // Pick a single file
// export const pickFile = async () => {
//   try {
//     const res = await DocumentPicker.pick({
//       type: [DocumentPicker.types.allFiles],
//     });
//     console.log(
//       res.uri,
//       res.type, // mime type
//       res.name,
//       res.size,
//     );
//   } catch (err) {
//     if (DocumentPicker.isCancel(err)) {
//       // User cancelled the picker, exit any dialogs or menus and move on
//     } else {
//       throw err;
//     }
//   }
// };

// // Pick multiple files
// try {
//   const results = await DocumentPicker.pickMultiple({
//     type: [DocumentPicker.types.images],
//   });
//   for (const res of results) {
//     console.log(
//       res.uri,
//       res.type, // mime type
//       res.name,
//       res.size
//     );
//   }
// } catch (err) {
//   if (DocumentPicker.isCancel(err)) {
//     // User cancelled the picker, exit any dialogs or menus and move on
//   } else {
//     throw err;
//   }
// }
