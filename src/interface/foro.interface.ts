export interface IForo {
    id: number;
    nombre: string;
    descripcion: string;
    imagen?: string;
    creado_por: IUsuario;
}

export interface ICategoria {
    id: number;
    foro: IForo;
    nombre: string;
    descripcion: string;
}

export interface IComentario {
    id: number;
    usuario: IUsuario;
    foro?: IForo;
    categoria?: ICategoria;
    contenido: string;
    fecha_creacion: Date;
}

export interface ILike {
    id: number;
    usuario: IUsuario;
    foro?: IForo;
    categoria?: ICategoria;
    fecha_creacion: Date;
}

export interface IUsuario {
    id: number;
    username: string;
    email: string;
}