import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { authPages, Pages } from '../config/pages.config';
import NotFoundPage from '../pages/NotFound.page';
import SinPermisos from '@/pages/SinPermisos';
import LoginPage from '../pages/Login.page';
import RecuperarPassword from '@/pages/ResetPassword/RecuperarPassword';
import ConfirmarNuevaPass from '@/pages/ResetPassword/ConfirmarNuevaPass';

const ProfilePage = lazy(() => import('../pages/Profile.page'));
const Home = lazy(() => import('@/pages/Home'))
// const ListaInvitacionesEmpresa = lazy(() => import('@/pages/InvitacionEmpresa/ListaInvitacionesEmpresa'))
// const AceptarInvitacionEmpresa = lazy(() => import('@/pages/AceptarInvitacionEmpresa'))
// const ListaDiasCalendarioV2 = lazy(() => import('@/pages/Calendario/ListaDiasCalendarioV2'))
// const PedirVacaciones = lazy(() => import('@/pages/Calendario/PedirVacaciones'))
// const PedirVacacionesUsuario = lazy(() => import('@/pages/Calendario/PedirVacacionesUsuario'))
// const ListaSolicitudesVacaciones = lazy(() => import('@/pages/Calendario/ListaSolicitudesVacaciones'))
// const DetalleSolicitudVacaciones = lazy(() => import('@/pages/Calendario/DetalleSolicitudVacaciones'))
// const ListaMisSolicitudesVacaciones = lazy(() => import('@/pages/Calendario/ListaSolicitudesVacacionesUsuario'))
// const PDFSolicitudVacaciones = lazy(() => import('@/pages/Calendario/pdf/PDFSolicitudVacaciones'))
// const ListaUsuariosEmpresa = lazy(() => import('@/pages/Empresas/ListaUsuariosEmpresa'))
// const DetalleUsuarioEmpresa = lazy(() => import('@/pages/Empresas/DetalleUsuarioEmpresa'))
// const ListaProveedoresEmpresa = lazy(() => import('@/pages/Items/Proveedor/ListaProveedoresEmpresa'))
// const DetalleProveedorEmpresa = lazy(() => import('@/pages/Items/Proveedor/DetalleProveedorEmpresa'))
// const ListaItemsEmpresa = lazy(() => import('@/pages/Items/ListaItemsEmpresa'))
// const DetalleItemEmpresa = lazy(() => import('@/pages/Items/DetalleItemEmpresa'))
// const ListaBodegas = lazy(() => import('@/pages/Bodegas/ListaBodegas'))
// const ListaOrdenesCompra = lazy(() => import('@/pages/Bodegas/OrdenCompra/ListaOrdenesCompra'))
// const DetalleOrdenCompra = lazy(() => import('@/pages/Bodegas/OrdenCompra/DetalleOrdenCompra'))
// const DetalleFabricante = lazy(() => import('@/pages/Items/Registro/Fabricantes/DetalleFabricante'))
// const DetalleCategoria = lazy (() => import('@/pages/Items/Registro/Categorias/DetalleCategoria'))
// const CompletarOrdenCompra = lazy(() => import('@/pages/Bodegas/OrdenCompra/CompletarOrdenCompra'))
// const ListaEmpresas = lazy(() => import('@/pages/Empresas/ListaEmpresas'))
// const EmpresaDetalle = lazy(() => import('@/pages/Empresas/EmpresaDetalle'))
// const ListaCategorias = lazy(() => import('@/pages/Items/Registro/Categorias/ListaCategorias'))
// const ListaFabricantes = lazy(() => import('@/pages/Items/Registro/Fabricantes/ListaFabricantes'))
// const ListaClientes = lazy(() => import('@/pages/Clientes/ListaClientes'))
// const DetalleCliente = lazy(() => import('@/pages/Clientes/DetalleClientes'))

export type IRoutePersonalizadas = RouteProps & {
	authority: string[]
}

const contentRoutes: IRoutePersonalizadas[] = [
	{ path: authPages.loginPage.to, element: <LoginPage />, authority: authPages.loginPage.autority },
	{ path: authPages.profilePage.to, element: <ProfilePage />, authority: authPages.profilePage.autority },
	// { path: authPages.aceptarInvitacionEmpresa.to, element: <AceptarInvitacionEmpresa />, authority: authPages.aceptarInvitacionEmpresa.authority },
	{ path: authPages.RecuperarPassword.to, element: <RecuperarPassword />, authority: authPages.RecuperarPassword.authority },
	{ path: authPages.ConfirmarNuevaPass.to, element: <ConfirmarNuevaPass />, authority: authPages.ConfirmarNuevaPass.authority },
	// { path: Pages.listaInvitacionesEmpresas.to, element: <ListaInvitacionesEmpresa />, authority: Pages.listaInvitacionesEmpresas.authority },
	// { path: Pages.ListaEmpresas.to, element: <ListaEmpresas />, authority: Pages.ListaEmpresas.authority },
	// { path: Pages.listaDiasCalendario.to, element: <ListaDiasCalendarioV2 />, authority: Pages.listaDiasCalendario.authority },
	// { path: Pages.EmpresaDetalle.to, element: <EmpresaDetalle />, authority: Pages.EmpresaDetalle.authority },
	// { path: Pages.pedirVacaciones.to, element: <PedirVacaciones />, authority: Pages.pedirVacaciones.authority },
	// { path: Pages.pedirVacacionesUsuario.to, element: <PedirVacacionesUsuario />, authority: Pages.pedirVacacionesUsuario.authority },
	// { path: Pages.listaSolicitudesVacaciones.to, element: <ListaSolicitudesVacaciones />, authority: Pages.listaSolicitudesVacaciones.authority },
	// { path: Pages.detalleSolicitudVacaciones.to, element: <DetalleSolicitudVacaciones />, authority: Pages.detalleSolicitudVacaciones.authority },
	// { path: Pages.listaMisSolicitudesVacaciones.to, element: <ListaMisSolicitudesVacaciones />, authority: Pages.listaMisSolicitudesVacaciones.authority },
	// { path: Pages.pdfSolicitudVacaciones.to, element: <PDFSolicitudVacaciones />, authority: Pages.pdfSolicitudVacaciones.authority },
	// { path: Pages.listaUsuariosEmpresa.to, element: <ListaUsuariosEmpresa />, authority: Pages.listaUsuariosEmpresa.authority },
	// { path: Pages.detalleUsuarioEmpresa.to, element: <DetalleUsuarioEmpresa />, authority: Pages.detalleUsuarioEmpresa.authority },
	// { path: Pages.listaProveedoresEmpresa.to, element: <ListaProveedoresEmpresa />, authority: Pages.listaProveedoresEmpresa.authority },
	// { path: Pages.detalleProveedorEmpresa.to, element: <DetalleProveedorEmpresa />, authority: Pages.detalleProveedorEmpresa.authority },
	// { path: Pages.listaItemsEmpresa.to, element: <ListaItemsEmpresa />, authority: Pages.listaItemsEmpresa.authority },
	// { path: Pages.detalleItemEmpresa.to, element: <DetalleItemEmpresa />, authority: Pages.detalleItemEmpresa.authority },
	// { path: Pages.listaBodegas.to, element: <ListaBodegas />, authority: Pages.listaBodegas.authority },
	// { path: Pages.listaOrdenesCompra.to, element: <ListaOrdenesCompra />, authority: Pages.listaOrdenesCompra.authority },
	// { path: Pages.detalleOrdenCompra.to, element: <DetalleOrdenCompra />, authority: Pages.detalleOrdenCompra.authority },
	// { path: Pages.detalleFabricante.to, element: <DetalleFabricante />, authority: Pages.detalleFabricante.authority },
	// { path: Pages.detalleCategoria.to, element: <DetalleCategoria />, authority: Pages.detalleCategoria.authority },
	// { path: Pages.completarOrdenCompra.to, element: <CompletarOrdenCompra />, authority: Pages.completarOrdenCompra.authority },
	// { path: Pages.listaCategorias.to, element: <ListaCategorias />, authority: Pages.listaCategorias.authority },
	// { path: Pages.listaFabricantes.to, element: <ListaFabricantes />, authority: Pages.listaFabricantes.authority },
	// { path: Pages.detalleCliente.to, element: <DetalleCliente/>, authority: Pages.detalleCliente.authority},
	// { path: Pages.listaClientes.to, element: <ListaClientes/>, authority: Pages.listaClientes.authority },
	{ path: '/', element: <Home />, authority: [] },
	{ path: '*', element: <NotFoundPage />, authority: [] },
	{ path: '/sin-permisos', element: <SinPermisos />, authority: [] },
];

export default contentRoutes;
