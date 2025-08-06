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
			this.tareasSeleccionadas.splice(index, 1); // quitar si ya estaba
		} else {
			this.tareasSeleccionadas.push(id); // agregar si no estaba
		}
	}

}
