export class Tarea {
    constructor(
        public id: number,
        public titulo: string,
        public minutos: number,
        public destacada: boolean = false  // Agregamos la propiedad para las tareas destacadas
    ){}
}