import DetalleCategoria from "@/pages/Items/Registro/Categorias/DetalleCategoria";
import RecuperarPassword from "@/pages/ResetPassword/RecuperarPassword";

export const authPages = {
	loginPage: {
		id: 'loginPage',
		to: '/login',
		text: 'Login',
		icon: 'HeroArrowRightOnRectangle',
		autority: [],
	},
	profilePage: {
		id: 'profilePage',
		to: '/profile',
		text: 'Perfil',
		icon: 'HeroUser',
		autority: [],
	},
	aceptarInvitacionEmpresa: {
		id: 'aceptarInvitacionEmpresa',
		to: '/aceptar-invitacion/:token',
		text: 'Aceptar Invitacion a Empresa',
		icon: 'HeroUser',
		authority: [],
	},
	RecuperarPassword:{
		id: 'RecuperarPassword',
		to: '/recuperar-password',
		text: 'Recuperar Password',
		icon: 'HeroDocument',
		authority: []
	},
	ConfirmarNuevaPass:{
		id: 'ConfirmarNuevaPass',
		to: '/confirmar-nueva-password/:uid/:token',
		text: 'Confirmar Nueva Password',
		icon: 'HeroDocument',
		authority: []
	}
};

export const Pages = {
	listaInvitacionesEmpresas: {
		id: 'listaInvitacionesEmpresas',
		to: '/invitaciones-empresas',
		text: 'Invitaciones',
		icon: 'DuoMailbox2',
		authority: ['admin', 'superadmin'],
	},
	ListaEmpresas: {
		id: 'ListaEmpresas',
		to: '/empresas',
		text: 'Empresas',
		icon: 'DuoMailbox',
		authority: ['superadmin'],
	},
	listaDiasCalendario: {
		id: 'listaDiasCalendario',
		to: '/lista-dias-calendario',
		text: 'Dias Calendario',
		icon: 'HeroCalendar',
		authority: [],
	},
	EmpresaDetalle: {
		id: 'EmpresaDetalle',
		to: '/empresas/:empresaId',
		text: 'Detalle Empresa',
		icon: 'HeroDocument',
		authority: ['admin', 'superadmin'],
	},
	pedirVacaciones: {
		id: 'pedirVacaciones',
		to: '/pedir-vacaciones',
		text: 'Pedir Vacaciones',
		icon: 'DuoSunset1',
		authority: ['admin', 'superadmin'],
	},
	pedirVacacionesUsuario: {
		id: 'pedirVacacionesUsuario',
		to: '/pedir-vacaciones-usuario',
		text: 'Pedir Vacaciones Usuario',
		icon: 'DuoSunset2',
		authority: [],
	},
	listaSolicitudesVacaciones: {
		id: 'listaSolicitudesVacaciones',
		to: '/lista-solicitudes-vacaciones',
		text: 'Solicitudes Vacaciones',
		icon: 'DuoBulletList',
		authority: ['admin', 'superadmin']
	},
	detalleSolicitudVacaciones: {
		id: 'detalleSolicitudVacaciones',
		to: '/detalle-solicitud-vacaciones/:id',
		text: 'Detalle Solicitud Vacaciones',
		icon: 'DuoBulletList',
		authority: ['admin', 'superadmin']
	},
	listaMisSolicitudesVacaciones: {
		id: 'listaMisSolicitudesVacaciones',
		to: '/lista-mis-solicitudes',
		text: 'Lista Mis Solicitudes Vacaciones',
		icon: 'DuoBulletList',
		authority: []
	},
	pdfSolicitudVacaciones: {
		id: 'pdfSolicitudVacaciones',
		to: '/pdf-solicitud/:id',
		text: 'PDF Solicitud Vacacion',
		icon: 'HeroDocument',
		authority: []
	},
	listaUsuariosEmpresa: {
		id: 'listaUsuariosEmpresa',
		to: '/lista-usuarios-empresa',
		text: 'Usuarios Empresa',
		icon: 'HeroUserGroup',
		authority: ['admin', 'superadmin']
	},
	detalleUsuarioEmpresa: {
		id: 'detalleUsuarioEmpresa',
		to: '/detalle-usuario-empresa/:id',
		text: 'Detalle Usuario Empresa',
		icon: 'HeroUserGroup',
		authority: ['admin', 'superadmin']
	},
	listaItem:{
		id: 'listaItem',
		to: '/item',
		text: 'Item',
		icon: 'HeroDocument',
		authority: ['superadmin']
	},
	listaProveedoresEmpresa: {
		id: 'listaFabricanteThunk',
		to: '/lista-proveedores-empresa',
		text: 'Proveedores',
		icon: 'HeroDocument',
		authority: ['admin', 'superadmin']
	},
	detalleProveedorEmpresa: {
		id: 'detalleProveedorEmpresa',
		to: '/detalle-proveedor-empresa/:id',
		text: 'Detalle Proveedor Empresa',
		icon: 'HeroDocument',
		authority: ['admin', 'superadmin']
	},
	listaItemsEmpresa: {
		id: 'listaItemsEmpresa',
		to: '/lista-items-empresa',
		text: 'Items',
		icon: 'HeroDocument',
		authority: ['admin', 'superadmin']
	},
	detalleItem:{
		id: 'detalleItems',
		to: '/detalle-item/:id',
		text: 'Detalle Item',
		icon: 'HeroDocument',
		authority: ['superadmin']
	},
	detalleFabricante:{
		id: 'detalleFabricante',
		to: '/detalle-fabricante/:id',
		text: 'Detalle Fabricante',
		icon: 'HeroDocument',
		authority: ['superadmin']
	},
	detalleCategoria:{
		id: 'detalleCategoria',
		to: '/detalle-categoria/:id',
		text: 'Detalle Categoria',
		icon: 'HeroDocument',
		authority: ['superadmin']
	},
	detalleItemEmpresa: {
		id: 'detalleItemEmpresa',
		to: '/detalle-item-empresa/:id',
		text: 'Detalle Item Empresa',
		icon: 'HeroDocument',
		authority: ['admin', 'superadmin']
	},
	listaBodegas: {
		id: 'listaBodegas',
		to: '/lista-bodegas',
		text: 'Bodegas',
		icon: 'HeroDocument',
		authority: ['admin', 'superadmin']
	},
	listaOrdenesCompra: {
		id: 'listaOrdenesCompra',
		to: '/lista-ordenes-compra',
		text: 'Ordenes Compra',
		icon: 'HeroDocument',
		authority: ['admin', 'superadmin']
	},
	detalleOrdenCompra: {
		id: 'detalleOrdenCompra',
		to: '/detalle-orden-compra/:id',
		text: 'Detalle Orden Compra',
		icon: 'HeroDocument',
		authority: ['admin', 'superadmin']
	},
	completarOrdenCompra: {
		id: 'completarOrdenCompra',
		to: '/completar-orden-compra/:id',
		text: 'Completar Orden Compra',
		icon: 'HeroDocument',
		authority: ['admin', 'superadmin']
	},
	listaCategorias:{
		id: 'listaCategorias',
		to: '/lista-categorias',
		text: 'Categorias',
		icon: 'HeroDocument',
		authority: ['superadmin']
	},
	listaFabricantes:{
		id: 'listaFabricantes',
		to: '/lista-fabricantes',
		text: 'Fabricantes',
		icon: 'HeroDocument',
		authority: ['superadmin']
	},
	listaClientes:{
		id: 'listaClientes',
		to: '/lista-clientes',
		text: 'Clientes',
		icon: 'HeroDocument',
		authority: ['superadmin']
	},
	detalleCliente:{
		id: 'detalleCliente',
		to: '/detalle-cliente/:id',
		text: 'Detalle Cliente',
		icon: 'HeroDocument',
		authority: ['superadmin']
	}
};


const pagesConfig = {
	...authPages,
	...Pages
};

export default pagesConfig;
