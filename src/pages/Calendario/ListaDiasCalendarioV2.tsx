import Calendar, { TViewMode, useCalendarView } from "@/components/Calendar";
import Button from "@/components/ui/Button";
import Card, { CardBody, CardHeader, CardHeaderChild } from "@/components/ui/Card";
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from "@/components/ui/Dropdown";
import { useAppDispatch, useAppSelector } from "@/store";
import { listaDiasCalendarioThunk, listaSolicitudesVacacionesThunk } from "@/store/slices/calendario/calendarioSlice";
import { TIcons } from "@/types/icons.type";
import { DateSelectArg, DayCellMountArg, EventClickArg, EventContentArg, EventSourceInput } from "@fullcalendar/core/index.js";
import FullCalendar from "@fullcalendar/react";
import esLocale from '@fullcalendar/core/locales/es';
import { createRef, useEffect, useState } from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import PageWrapper from "@/components/layouts/PageWrapper/PageWrapper";
import Modal, { ModalBody, ModalFooter, ModalFooterChild, ModalHeader } from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import Textarea from "@/components/form/Textarea";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import ApiService from "@/services/ApiService";
import Input from "@/components/form/Input";
import Validation from "@/components/form/Validation";
import Radio, { RadioGroup } from "@/components/form/Radio";
import { Dictionary } from "@fullcalendar/core/internal";
import * as Yup from 'yup'


function ListaDiasCalendarioV2() {
	const dispatch = useAppDispatch()
	const { listaSolicitudesVacaciones, listaDiasCalendario } = useAppSelector((state) => state.calendario)
	const { personalizacionUsuario, listaGrupos } = useAppSelector((state) => state.auth)
	const [eventosVacaciones, setEventosVacaciones] = useState<EventSourceInput | undefined>()
	const ref = createRef<FullCalendar>();
	const {
		viewMode,
		changeViewMode,
		next,
		prev,
		today,
		title: currentDate,
		handleDatesSet,
	} = useCalendarView(ref);
	const CALENDAR_VIEW: { [key in TViewMode]: { key: TViewMode; text: string; icon: TIcons } } = {
		timeGridDay: { key: 'timeGridDay', text: 'Dias', icon: 'HeroCalendar' },
		timeGridWeek: { key: 'timeGridWeek', text: 'Semanas', icon: 'HeroTableCells' },
		dayGridMonth: { key: 'dayGridMonth', text: 'Meses', icon: 'HeroCalendarDays' },
		listWeek: { key: 'listWeek', text: 'Lista', icon: 'HeroClipboardDocumentCheck' },
	};
	const [isOpenModalDia, setIsOpenModalDia] = useState<boolean>(false)
	const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | undefined>()
	const [isOpenModalEliminarDia, setIsOpenModalEliminarDia] = useState<boolean>(false)
	const [isOpenModalDetalle, setIsOpenModalDetalle] = useState<boolean>(false)
	const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<Dictionary | undefined>()

	useEffect(() => {
		dispatch(listaDiasCalendarioThunk())
		dispatch(listaSolicitudesVacacionesThunk())
	}, [personalizacionUsuario])

	useEffect(() => {
		const eventosDiasCalendario = listaDiasCalendario.map((dia) => {
			return {
				id: `${dia.id}_C`,
				title: dia.descripcion,
				start: dayjs(dia.fecha).toDate(),
				classNames: ['bg-red-300 hover:bg-red-500 hover:cursor-pointer'],
				extendedProps: {
					tipo_evento: 'calendario',
				}
			};
		});
		const eventosSolicitudesVacaciones = listaSolicitudesVacaciones.filter(sol => sol.estado === "2").map((solicitud) => {
			return {
				id: `${solicitud.id}_S`,
				title: solicitud.papeleta.nombre_empleado,
				start: dayjs(solicitud.fecha_inicio).toDate(),
				end: dayjs(solicitud.fecha_fin).toDate(),
				classNames: ['bg-blue-500 hover:bg-blue-500 hover:cursor-pointer'],
				extendedProps: {
					tipo_evento: 'solicitud',
					...solicitud
				}
			};
		});
		const eventosCombinados = [...eventosDiasCalendario, ...eventosSolicitudesVacaciones];
		setEventosVacaciones(eventosCombinados);
	}, [listaDiasCalendario, listaSolicitudesVacaciones]);

	const handleDateSelect = (selectInfo: DateSelectArg) => {
		// eslint-disable-next-line no-alert
		setFechaSeleccionada(selectInfo.start)
		const fecha = listaDiasCalendario.find(dia => dayjs(dia.fecha).format('DD-MM-YYYY') === dayjs(selectInfo.start).format('DD-MM-YYYY'))
		if (fecha) {
			formik.setFieldValue("descripcion", fecha.descripcion)
		}
		setIsOpenModalDia(true)
	};

	const handleEventClick = (clickInfo: EventClickArg) => {
		// eslint-disable-next-line no-restricted-globals,no-alert
		// if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
		// 	clickInfo.event.remove();
		// }
		// console.log(clickInfo.event.extendedProps)
		if (clickInfo.event.extendedProps.tipo_evento === "calendario" && clickInfo.event.start) {
			setFechaSeleccionada(clickInfo.event.start)
			setIsOpenModalDia(true)
		} else {
			// console.log(clickInfo.event.extendedProps)
			setSolicitudSeleccionada(clickInfo.event.extendedProps)
			setIsOpenModalDetalle(true)
		}
	};

	const renderEventContent = (eventContent: EventContentArg) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		// const { user, ...rest }: { user?: TUser } = eventContent.event.extendedProps;

		return (
			<>
				{/* {user && <Avatar src={user.image?.thumb} className='me-2 w-6' />} */}
				<div className='p-1'>{eventContent.event.title}</div>
				{/* {eventContent.timeText && <b>{eventContent.timeText}</b>} */}
			</>
		);
	};

	// // eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

	// const handleEvents = (events: EventApi[]) => {
	// 	setCurrentEvents(events);
	// };

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			descripcion: ""
		},
		validationSchema: Yup.object().shape({
			descripcion: Yup.string().nullable().max(250, "Maximo 250 caracteres")
		}),
		onSubmit: async (values) => {
			try {
				const response = await ApiService.fetchData({ url: `/api/dias-calendario/${listaDiasCalendario.find(dia => dayjs(dia.fecha).format('DD-MM-YYYY') === dayjs(fechaSeleccionada).format('DD-MM-YYYY'))?.id}/`, method: 'patch', headers: { 'Content-Type': 'application/json' }, data: JSON.stringify(values) })
				if (response.data) {
					toast.success("Feriado Editado", { autoClose: 1000 })
					dispatch(listaDiasCalendarioThunk())
					setIsOpenModalDia(false)
				}
			} catch (error: any) {
				toast.error(error.response.data)
			}
		}
	})

	const formikCrear = useFormik({
		enableReinitialize: true,
		initialValues: {
			descripcion: "",
			es_feriado: true,
			es_irrenunciable: false,
			tipo: "",
		},
		validationSchema: Yup.object().shape({
			descripcion: Yup.string().nullable().max(250, "Maximo 250 caracteres"),
			es_irrenunciable: Yup.boolean().required("Requerido"),
			tipo: Yup.string().nullable().max(50, "Maximo 50 caracteres")
		}),
		onSubmit: async (values) => {
			try {
				const response = await ApiService.fetchData({ url: `/api/dias-calendario/`, method: 'post', headers: { 'Content-Type': 'application/json' }, data: JSON.stringify({ ...values, empresa: personalizacionUsuario?.empresa, fecha: dayjs(fechaSeleccionada).format('YYYY-MM-DD') }) })
				if (response.data) {
					toast.success("Feriado Creado", { autoClose: 1000 })
					dispatch(listaDiasCalendarioThunk())
					setIsOpenModalDia(false)
				}
			} catch (error: any) {
				toast.error(error.response.data)
			}
		}
	})

	return (
		<PageWrapper isProtectedRoute={true} title="Calendario" name="Calendario">
			<Card className='h-full'>
				<CardHeader>
					<CardHeaderChild>{currentDate}</CardHeaderChild>
					<CardHeaderChild>
						<Button onClick={() => prev(true)} icon='HeroChevronDoubleLeft' />
						<Button onClick={() => prev()} icon='HeroChevronLeft' />
						<Button onClick={() => today()} icon='HeroCalendar' />
						<Button onClick={() => next()} icon='HeroChevronRight' />
						<Button onClick={() => next(true)} icon='HeroChevronDoubleRight' />
						<Dropdown>
							<DropdownToggle>
								<Button color='zinc' icon={CALENDAR_VIEW[viewMode].icon}>
									{CALENDAR_VIEW[viewMode].text}
								</Button>
							</DropdownToggle>
							<DropdownMenu placement='bottom-end'>
								{Object.values(CALENDAR_VIEW).map((item) => (
									<DropdownItem
										key={item.key}
										isActive={viewMode === item.key}
										onClick={() => changeViewMode(item.key)}
										icon={item.icon}>
										{item.text}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
					</CardHeaderChild>
				</CardHeader>
				<CardBody>
					<Calendar
						ref={ref}
						height={700}
						datesSet={handleDatesSet}
						viewMode={viewMode}
						events={eventosVacaciones}
						// editable
						selectable
						// selectMirror
						dayCellContent={(props) => (
							<div className={classNames(
								'font-bold text-lg',
								props.date.getDay() === 0 || listaDiasCalendario.some(dia => dayjs(dia.fecha).format('DD-MM-YYYY') === dayjs(props.date).format('DD-MM-YYYY')) ? "text-red-600" : ""
							)}>
								<div>{dayjs(props.date).format('DD')}</div>
							</div>
						)}
						select={handleDateSelect}
						eventContent={renderEventContent}
						eventClick={handleEventClick}
						// eventsSet={handleEvents}
						eventClassNames='truncate'
						locale={esLocale}
					/>
				</CardBody>
			</Card>
			<Modal
				isOpen={isOpenModalDia}
				setIsOpen={setIsOpenModalDia}
				isStaticBackdrop={true}
				isStaticBackdropAnimation={false}
			>
				<ModalHeader><Badge>Dia {dayjs(fechaSeleccionada).format('DD-MM-YYYY')}</Badge></ModalHeader>
				<ModalBody>
					{listaGrupos && listaGrupos.grupos.some(grupo => grupo === "admin" || grupo === "superadmin") ? (
						fechaSeleccionada && listaDiasCalendario.some(dia => dayjs(dia.fecha).format('DD-MM-YYYY') === dayjs(fechaSeleccionada).format('DD-MM-YYYY')) ? (
							<div className="grid grid-cols-1 gap-4">
								<div className="flex">
									<div className="w-full">
										<Badge>Tipo</Badge>
										<div className="ml-4">{listaDiasCalendario.find(dia => dayjs(dia.fecha).format('DD-MM-YYYY') === dayjs(fechaSeleccionada).format('DD-MM-YYYY'))?.tipo}</div>
									</div>
									<div className="w-full">
										<Badge>¿Es Irrenunciable?</Badge>
										<div className="ml-4">{listaDiasCalendario.find(dia => dayjs(dia.fecha).format('DD-MM-YYYY') === dayjs(fechaSeleccionada).format('DD-MM-YYYY'))?.es_irrenunciable ? "Si" : "No"}</div>
									</div>
								</div>
								<div className="flex">
									<Badge>Descripción</Badge>
									<Validation
										isValid={formik.isValid}
										isTouched={formik.touched.descripcion}
										invalidFeedback={formik.errors.descripcion}
									>
										<Textarea
											value={formik.values.descripcion}
											name="descripcion"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</Validation>
								</div>
								<div className="flex justify-between">
									<Button variant="solid" color="red" onClick={() => { setIsOpenModalEliminarDia(true) }}>Eliminar Dia</Button>
									<div className="gap-4 flex">
										<Button onClick={() => { setIsOpenModalDia(false) }}>Cancelar</Button>
										<Button variant="solid" onClick={() => { formik.handleSubmit() }}>Guardar</Button>
									</div>
								</div>
							</div>
						) : (
							<div className="grid grid-cols-1 gap-4">
								<div className="flex flex-col">
									<div className="w-full">
										<Badge className="text-xl">Crear Feriado</Badge>
									</div>
									<div className="w-full ml-4 mb-4">
										Ingrese los datos del dia feriado que desea crear.
									</div>
									<div className="w-full">
										<Badge>Tipo</Badge>
										<Validation
											isValid={formikCrear.isValid}
											isTouched={formikCrear.touched.tipo}
											invalidFeedback={formikCrear.errors.tipo}
										>
											<Input
												name="tipo"
												type="text"
												value={formikCrear.values.tipo}
												onChange={formikCrear.handleChange}
												onBlur={formikCrear.handleBlur}
											/>
										</Validation>
									</div>
									<div className="w-full">
										<Badge>¿Es Irrenunciable?</Badge>
										<Validation
											isValid={formikCrear.isValid}
											isTouched={formikCrear.touched.es_feriado}
											invalidFeedback={formikCrear.errors.es_feriado}
										>
											<RadioGroup isInline>
												<Radio
													label="Si"
													name="es_feriado"
													value="true"
													selectedValue={`${formikCrear.values.es_irrenunciable}`}
													onChange={() => { formikCrear.setFieldValue('es_irrenunciable', true) }}
												/>
												<Radio
													label="No"
													name="es_feriado"
													value="false"
													selectedValue={`${formikCrear.values.es_irrenunciable}`}
													onChange={() => { formikCrear.setFieldValue('es_irrenunciable', false) }}
												/>
											</RadioGroup>
										</Validation>
									</div>
									<div className="w-full">
										<Badge>Descripción</Badge>
										<Validation
											isValid={formikCrear.isValid}
											isTouched={formikCrear.touched.descripcion}
											invalidFeedback={formikCrear.errors.descripcion}
										>
											<Textarea
												name="descripcion"
												value={formikCrear.values.descripcion}
												onChange={formikCrear.handleChange}
												onBlur={formikCrear.handleBlur}
											/>
										</Validation>
									</div>
									<div className="flex justify-end mt-4">
										<Button onClick={() => { setIsOpenModalDia(false) }}>Cancelar</Button>
										<Button variant="solid" onClick={() => { formikCrear.handleSubmit() }}>Crear</Button>
									</div>
								</div>
							</div>
						)
					) : (
						<div className="grid grid-cols-1 gap-4">
							<div className="flex">
								<div className="w-full">
									<Badge>Tipo</Badge>
									<div className="ml-4">{listaDiasCalendario.find(dia => dayjs(dia.fecha).format('DD-MM-YYYY') === dayjs(fechaSeleccionada).format('DD-MM-YYYY'))?.tipo}</div>
								</div>
								<div className="w-full">
									<Badge>¿Es Irrenunciable?</Badge>
									<div className="ml-4">{listaDiasCalendario.find(dia => dayjs(dia.fecha).format('DD-MM-YYYY') === dayjs(fechaSeleccionada).format('DD-MM-YYYY'))?.es_irrenunciable ? "Si" : "No"}</div>
								</div>
							</div>
							<div className="flex">
								<Badge>Descripción</Badge>
								{/* <Validation
									isValid={formik.isValid}
									isTouched={formik.touched.descripcion}
									invalidFeedback={formik.errors.descripcion}
								>
									<Textarea
										value={formik.values.descripcion}
										name="descripcion"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</Validation> */}
								<div className="ml-4">{listaDiasCalendario.find(dia => dayjs(dia.fecha).format('DD-MM-YYYY') === dayjs(fechaSeleccionada).format('DD-MM-YYYY'))?.descripcion}</div>
							</div>
							{/* <div className="flex justify-between">
								<Button variant="solid" color="red" onClick={() => {setIsOpenModalEliminarDia(true)}}>Eliminar Dia</Button>
								<div className="gap-4 flex">
									<Button onClick={() => {setIsOpenModalDia(false)}}>Cancelar</Button>
									<Button variant="solid" onClick={() => {formik.handleSubmit()}}>Guardar</Button>
								</div>
							</div> */}
						</div>
					)}
				</ModalBody>
			</Modal>
			<Modal
				isOpen={isOpenModalEliminarDia}
				setIsOpen={setIsOpenModalEliminarDia}
			>
				<ModalHeader><Badge>¿Esta Seguro de Eliminar el Feriado?</Badge></ModalHeader>
				<ModalBody>
					<div>
						<div>Esta accion no se puede deshacer.</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<ModalFooterChild></ModalFooterChild>
					<ModalFooterChild>
						<Button onClick={() => { setIsOpenModalEliminarDia(false) }}>Cancelar</Button>
						<Button variant="solid" color="red" onClick={async () => {
							try {
								const response = await ApiService.fetchData({ url: `/api/dias-calendario/${listaDiasCalendario.find(dia => dayjs(dia.fecha).format('DD-MM-YYYY') === dayjs(fechaSeleccionada).format('DD-MM-YYYY'))?.id}/`, method: 'delete' })
								if (response.status === 204) {
									toast.success("Dia Feriado Eliminado", { autoClose: 1000 })
									dispatch(listaDiasCalendarioThunk())
									setIsOpenModalEliminarDia(false)
									setIsOpenModalDia(false)
								}
							} catch (error: any) {
								toast.error(error.response.data)
							}
						}}>Eliminar</Button>
					</ModalFooterChild>
				</ModalFooter>
			</Modal>
			<Modal
				isOpen={isOpenModalDetalle}
				setIsOpen={setIsOpenModalDetalle}
			>
				<ModalHeader><Badge>Vacaciones {solicitudSeleccionada?.papeleta.nombre_empleado}</Badge></ModalHeader>
				<ModalBody>
					<div className="grid grid-cols-3">
						<div className="w-full">
							<Badge>Fecha Inicio</Badge>
							<div className="ml-4">{solicitudSeleccionada?.fecha_inicio}</div>
						</div>
						<div className="w-full">
							<Badge>Fecha Fin</Badge>
							<div className="ml-4">{solicitudSeleccionada?.fecha_fin}</div>
						</div>
						<div className="w-full">
							<Badge>Aprobado Por</Badge>
							<div className="ml-4">{solicitudSeleccionada?.nombre_aprobado_rechazado_por}</div>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</PageWrapper>
	);
};

export default ListaDiasCalendarioV2