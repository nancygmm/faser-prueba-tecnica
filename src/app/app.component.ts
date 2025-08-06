import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];
	tareasSeleccionadas: number[] = [];


	nuevoTitulo: string = ''; // Acá almacenaremos el nombre de la nueva tarea
	nuevosMinutos: number = 1; // Almacena los minutos de la nueva tarea a agregar

	ordenActual: string = '';
	ascendente: boolean = true;

	constructor(
        public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	agregarTarea() {
		const nuevoId = this.tareas.length > 0 ? this.tareas[this.tareas.length - 1].id + 1 : 1;
		const nuevaTarea = new Tarea(nuevoId, this.nuevoTitulo, this.nuevosMinutos);
		this.tareas.push(nuevaTarea);

		// Reseteamos los campos luego de ingresar
		this.nuevoTitulo = '';
		this.nuevosMinutos = 1;
	}

	alternarSeleccion(id: number) {
		const index = this.tareasSeleccionadas.indexOf(id);
		if (index > -1) {
			this.tareasSeleccionadas.splice(index, 1); 
		} else {
			this.tareasSeleccionadas.push(id); // Agregar si no estaba marcada
		}
	}

	eliminarTareasSeleccionadas() {
		this.tareas = this.tareas.filter(t => !this.tareasSeleccionadas.includes(t.id));
		this.tareasSeleccionadas = []; // Aqui refresca para que aparezcan las que no se eliminaron (básicamente es un update)
	}

	ordenarPor(campo: keyof Tarea) {
		if (this.ordenActual === campo) {
			this.ascendente = !this.ascendente; // Aquí cambiamos el orde ascendente/descendente
		} else {
			this.ordenActual = campo;
			this.ascendente = true;
		}

		this.tareas.sort((a, b) => {
			if (a[campo] < b[campo]) return this.ascendente ? -1 : 1;
			if (a[campo] > b[campo]) return this.ascendente ? 1 : -1;
			return 0;
		});
	}

}
