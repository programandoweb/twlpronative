import * as FileSystem from 'expo-file-system';
import {Config} from './../helpers/Config';


const Back = (Object)  =>{
  let array_navigation  = Object.state.navigation
  let anterior  = parseInt(array_navigation.length) - 1;
  let back      = array_navigation[anterior];
  let new_array = []

  array_navigation.map((v,k) => {
    if (k!=anterior) {
      new_array =  [...new_array,v]
    }
  })

  if(Object.methods!=undefined){
    //console.log(new_array,array_navigation,back,Object.methods.sobre_escribir_el_estado);
    Object.methods.sobre_escribir_el_estado({navigation:new_array,screen:back});
  }else if (Object.sobre_escribir_el_estado!=undefined){
    Object.sobre_escribir_el_estado({navigation:new_array,screen:back});
  }
}

const Array_search =  (array,search,Object)  =>  {
  return new Promise(resolve => {
    let new_array = []
    let bool      = "NO";
    array.map((v,k) => {
      if (v==search) {
        bool  = "SI"
      }
    })
    if (bool=="NO") {
      new_array =  [...Object.state.navigation,search]
      Object.methods.sobre_escribir_el_estado({navigation:new_array})
    }
    //console.log(array,search);
    //resolve(base64)
  });
}

const Add_Evaluaciones =  ( Object ) => {
  var   headers =   new Headers();
  var   data    =   new FormData();
  if (Object.state.result_singleFile.uri!=undefined) {
        let   uri       =   Object.state.result_singleFile.uri
        let   uriParts  =   uri.split('.');
        let   fileType  =   uriParts[uriParts.length - 1];
        data.append('archivo_base64', Object.state.singleFile );
        data.append('archivo_datos', JSON.stringify(Object.state.result_singleFile) );
        data.append('archivo_ext', fileType );
      }
        if( Object.state.evaluacion==''
            ||  Object.state.materia==''
            ||  Object.state.periodo==''
            ||  Object.state.descripcion==''
            ||  Object.state.descripcion==''){
            let obj = {
                        isVisible:true,
                        title:"Atención",
                        messages:"Debes completar los datos para continuar...",
                        height: "auto",
                      }
                Object.props.methods.sobre_escribir_el_estado({modal:obj})
            return false;
        }
        data.append('evaluacion', Object.state.evaluacion );
        data.append('materia_token', Object.state.materia );
        data.append('periodo', Object.state.periodo );
        data.append('descripcion', Object.state.descripcion );
        data.append('fecha', Object.state.fecha );
  let   cabecera  =   { headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data; charset=UTF-8',
                      },
                      method: "POST",
                      body: data
                    }
  fetch(Config.ApiRest + "post?modulo=Profesores&m=APP_AddEvaluacion&formato=json&u="+Object.state.user,cabecera)
    .then(response => response.json())
    .then(data =>
      Object.props.methods.recargar_tareas({})
    )
}

const FechaHoy = ()  =>{
  /*FECHA DE HOY*/
  let date    =   new Date( );
  let day     =   date.getDate();
      if (day < 10) {
        day = "0"+day;
      }
  let month  =  date.getUTCMonth();
      if (month < 10) {
        month  =  month+1;
        month  =  "0"+month;
      }else {
        month  =  month+1;
      }

  let year   =  date.getUTCFullYear();
  let newDate = year+"-"+month+"-"+day;
  return newDate;
}

const Convertir_base64 = (result)  =>{
  return new Promise(resolve => {
    let base64;
    base64 =  FileSystem.readAsStringAsync(  result.uri,{encoding: FileSystem.EncodingType.Base64,});
    resolve(base64)
  });
}

export {Add_Evaluaciones,Convertir_base64,FechaHoy,Array_search,Back}
