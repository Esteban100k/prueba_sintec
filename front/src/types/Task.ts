interface Task {
    id: number;
    titulo: string;
    descripcion: string;
    id_estado: string;
    created_at: string;
    updated_at: string;
}

interface TaskState {
    id: number;
    nombre_estado: string;
    created_at: string;
    updated_at: string;
}
