import axios from "axios";
import Swal from "sweetalert2";
import { actualizarAvance } from '../funciones/avance';


const tareas = document.querySelector('.listado-pendientes');

if(tareas){
    tareas.addEventListener('click', e => {
        if(e.target.classList.contains("check")){
            const icono = e.target
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            
            //hace un request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;
            
            axios.patch(url, {idTarea})
                .then( function(respuesta){
                    if(respuesta.status == 200){
                        icono.classList.toggle('completo')
                        actualizarAvance();
                    }
                })
        }

        if(e.target.classList.contains('delete')){
            const tareaHtml = e.target.parentElement.parentElement;

            const idTarea = tareaHtml.dataset.tarea;

            //preguntamos si se quiere eliminar la tarea
            Swal.fire({
                title: '¿Deseas borrar esta tarea?',
                text: "Una tarea eliminada no se puede recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: "No, cancelar"
            }).then((result) => {

                if (result.isConfirmed) {
                    //creamos la url para realizar la peticion
                    const url = `${location.origin}/tareas/${idTarea}`;
                    
                    //enviar el delete con exios
                    axios.delete(url, {params: { idTarea }})
                        .then( function(respuesta){
                            if(respuesta.status == 200){
                                //eliminar el nodo
                                tareaHtml.parentElement.removeChild(tareaHtml);

                                //alerta opcional
                                Swal.fire(
                                    'Tarea Eliminada',
                                    respuesta.data,
                                    'success'
                                )
                                actualizarAvance() 
                            }

                        } )

                }
            })
            
        }
    })
    
}


export default tareas;