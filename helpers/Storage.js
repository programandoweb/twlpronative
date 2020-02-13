import { AsyncStorage } from 'react-native';

const Storage = {
  set : async (key,value,method) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(value) );
      method.sobre_escribir_el_estado(value);
    } catch (error) {
      //console.log("error: "+error);
    }
  },
  get:(key)=>{
    return AsyncStorage.getItem(key);
  },
  clear:(method)=>{
    console.log(321);
    AsyncStorage.clear();
    method.sobre_escribir_el_estado({user:{}});
  },
};

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

export {Storage,UserDefault}
