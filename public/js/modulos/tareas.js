import axios from "axios";
import Swal from "sweetalert2";
import { actualizarAvance } from '../funciones/avance';


const tareas = document.querySelector('.listado-pendientes');

if(tareas){
    tareas.addEventListener('click', e => {
        if(e.target.classList.contains("fa-check-circle")){
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

        if(e.target.classList.contains('fa-trash')){
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
                    const url = `${location.origin}/tareas/${idTarea}`;

                    axios.delete(url, {params: { idTarea }})
                        .then( function(respuesta){
                            if(respuesta.status == 200){
                                tareaHtml.parentElement.removeChild(tareaHtml);

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