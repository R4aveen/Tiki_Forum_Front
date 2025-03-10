import React from 'react';
import { RouteProps } from 'react-router-dom';
import DefaultAsideTemplate from '../templates/layouts/Asides/DefaultAside.template';
import { authPages } from '../config/pages.config';

const asideRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: authPages.aceptarInvitacionEmpresa.to, element: null},
	{ path: authPages.RecuperarPassword.to, element: null},
	{ path: authPages.ConfirmarNuevaPass.to, element: null},
	{ path: '*', element: <DefaultAsideTemplate /> },
];

export default asideRoutes;
