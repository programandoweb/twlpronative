import Storage from 'react-native-storage';
//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {
  }
});

// storage.save({
//   key: 'UserDefault', // Note: Do not use underscore("_") in key!
//   id: [0], // Note: Do not use underscore("_") in id!
//   data: {},
//   expires: 1000 * 60
// });
//
// storage.getAllDataForKey('UserDefault').then(data => {
//   UserDefault = data;
// });

let  UserDefault = {  user_id:0,
                      usuario_id:0,
                      perfil_id:0,
                      ventana:0,
                      is_grupo:0,
                      token:0,
                      nombre:"Anónimo",
                      alias:"Anónimo",
                      nombre_usuario:"Anónimo",
                      avatar:"https://apanel.lalexpo.com/images/No_image.png",
                  }

// storage.getAllDataForKey('UserDefault').then(data => {
//   if (Array.isArray(data) && data.length>0 ) {
//     UserDefault = data;
//   }
// });

//storage.clearMapForKey('UserDefault');

export {storage,UserDefault}
