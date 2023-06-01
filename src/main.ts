import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import Swal from 'sweetalert2'; // alertas

import { toggleFullscreen } from './app/Interfaces/fullscreen';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

//   if(!document.fullscreenElement){
//     localStorage.setItem("full", '{"active": false}')
//   }else{
//     localStorage.setItem("full", '{"active": true}')
//   }
// let IsFullScreen : boolean;
// try{
//   IsFullScreen = JSON.parse(localStorage.getItem("full")!).active
// }catch{
//   localStorage.setItem("full", '{"active": false}')
// }finally{
//   IsFullScreen = JSON.parse(localStorage.getItem("full")!).active
// }

// if(!IsFullScreen){
//   Swal.fire({
//     title : "FullScreen",
//     text: "¿Desea activar la pantalla completa?",
//     showCancelButton: true,
//     showConfirmButton: true,
//     confirmButtonText: "Activar",
//     cancelButtonText: "No, cancelar",
//     confirmButtonColor: "green",
//     cancelButtonColor: "red"
//   }).then((result)=>{
//     if(result.isConfirmed){
//       toggleFullscreen()
//       localStorage.setItem("full", '{"active": true}')
//     }
//   })
// }

