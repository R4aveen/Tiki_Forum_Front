import Container from "@/components/layouts/Container/Container"
import PageWrapper from "@/components/layouts/PageWrapper/PageWrapper"
import Subheader, { SubheaderLeft, SubheaderRight } from "@/components/layouts/Subheader/Subheader"
import { useAppDispatch, useAppSelector } from "@/store"
import { listaUsuariosEmpresaThunk } from "@/store/slices/empresa/empresaSlice"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { DateRange, Range } from "react-date-range"
import es from 'date-fns/locale/es';
import Card, { CardBody, CardHeader, CardHeaderChild } from "@/components/ui/Card"
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { IUsuarioEmpresa } from "@/interface/empresas.interface"
import Table, { TBody, Td, Th, THead, Tr } from "@/components/ui/Table"
import Icon from "@/components/icon/Icon"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import * as Yup from 'yup'
import Textarea from "@/components/form/Textarea"
import TableCardFooterTemplateV2 from "@/templates/Table/TableFooterTemplateV2"
import Input from "@/components/form/Input"
import { toast } from "react-toastify"
import ApiService from "@/services/ApiService"
import dayjs from "dayjs"
import calcularDiasHabiles from "./utils/calcularDiasHabiles"


const columHelper = createColumnHelper<IUsuarioEmpresa>()

function PedirVacaciones() {
    const dispatch = useAppDispatch()
    const { personalizacionUsuario } = useAppSelector((state) => state.auth)
    const { listaUsuariosEmpresa } = useAppSelector((state) => state.empresa)
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<IUsuarioEmpresa>()
    const [state, setState] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);

    useEffect(() => {
        if (state.length > 0) {
            if (state[0].startDate) {
                formik.setFieldValue('fecha_inicio', state[0].startDate.toDateString())
            }
            if (state[0].endDate) {
                formik.setFieldValue('fecha_fin', state[0].endDate.toDateString())
            }
        }
    }, [state])

    useEffect(() => {
        dispatch(listaUsuariosEmpresaThunk())
    }, [personalizacionUsuario])

    const validationSchema = Yup.object().shape({
        usuario_empresa: Yup.number().required('Requerido').min(1),
        fecha_inicio: Yup.string().required('Requerido'),
        fecha_fin: Yup.string().required('Requerido'),
        comentario: Yup.string().nullable(),
    }).test('dias-disponibles', 'No tienes suficientes días disponibles', function (values) {
        const { usuario_empresa, fecha_inicio, fecha_fin } = values;

        if (usuario_empresa > 0 && fecha_inicio && fecha_fin) {
            const startDate = new Date(fecha_inicio);
            const endDate = new Date(fecha_fin);
            const diasHabiles = calcularDiasHabiles(startDate, endDate);

            const usuario = listaUsuariosEmpresa.find(user => user.id === usuario_empresa)

            if (usuario && usuario.papeleta.dias_disponibles < diasHabiles) {
                return this.createError({
                    path: 'fecha_fin',
                    message: `Los días seleccionados (${diasHabiles}) exceden los días disponibles (${usuario.papeleta.dias_disponibles}).`,
                });
            }
        }

        return true;
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            usuario_empresa: 0,
            fecha_inicio: "",
            fecha_fin: "",
            comentario: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await ApiService.fetchData({ url: `/api/solicitudes-vacaciones/`, method: 'post', headers: { 'Content-Type': 'application/json' }, data: JSON.stringify({ ...values, fecha_inicio: dayjs(values.fecha_inicio).format('YYYY-MM-DD'), fecha_fin: dayjs(values.fecha_fin).format('YYYY-MM-DD'), creado_por: personalizacionUsuario?.usuario }) })
                if (response.data) {
                    toast.success("Solicitud Creada", { autoClose: 1000 })
                    formik.resetForm()
                    setUsuarioSeleccionado(undefined)
                    setState([
                        {
                            startDate: new Date(),
                            endDate: new Date(),
                            key: 'selection',
                        }
                    ])
                }
            } catch (error: any) {
                toast.error(error.response.data)
            }
        }
    })

    const columns = [
        columHelper.accessor("nombre_usuario", {
            cell: (info) => info.getValue(),
            header: "Nombre"
        })
    ]

    const table = useReactTable({
        data: listaUsuariosEmpresa,
        columns: columns,
        state: {
            sorting: sorting,
            globalFilter: globalFilter,
        },
        onSortingChange: setSorting,
        enableGlobalFilter: true,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageSize: 5 },
        },
    });

    return (
        <PageWrapper isProtectedRoute={true} title="Crear Solicitud Vacaciones" name="Crear Solicitud Vacaciones">
            <Subheader>
                <SubheaderLeft>
                    <Badge className="text-xl">Pedir Vacaciones</Badge>
                </SubheaderLeft>
                <SubheaderRight>
                    <Button onClick={() => { formik.handleSubmit() }} variant="solid">Crear Solicitud</Button>
                </SubheaderRight>
            </Subheader>
            <Container className="w-full h-full">
                <div className="h-full flex">
                    <div className="grid grid-cols-12 w-full gap-4">
                        <div className="col-span-full">
                            <Card>
                                <CardBody className="flex flex-col md:flex-row justify-center items-center">
                                    <div className="w-full">
                                        <Badge>Dias Acumulados</Badge>
                                        <div id="dias_acumulados" className="ml-4">{usuarioSeleccionado ? `${usuarioSeleccionado.papeleta.dias_acumulados} dias` : "Sin Usuario"}</div>
                                    </div>
                                    <div className="w-full">
                                        <Badge>Dias Disponibles</Badge>
                                        <div id="dias_disponibles" className="ml-4">{usuarioSeleccionado ? `${usuarioSeleccionado.papeleta.dias_disponibles} dias` : "Sin Usuario"}</div>
                                    </div>
                                    <div className="w-full">
                                        <Badge>Dias Tomados</Badge>
                                        <div id="dias_tomados" className="ml-4">{usuarioSeleccionado ? `${usuarioSeleccionado.papeleta.dias_tomados} dias` : "Sin Usuario"}</div>
                                    </div>
                                    <div className="w-full">
                                        <Badge>Dias Habiles Seleccionados</Badge>
                                        <div className="ml-4">{calcularDiasHabiles(new Date(formik.values.fecha_inicio), new Date(formik.values.fecha_fin))}</div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-span-12 lg:col-span-6 order-1">
                            {/* <SelectReact
                                name="usuario_empresa"
                                isMulti={false}
                                options={listaUsuariosEmpresa.map((user) => {return {value: user.id.toString(), label: user.nombre_usuario }})}
                                value={{value: formik.values.usuario_empresa.toString(), label: listaUsuariosEmpresa.find(user => user.id.toString() === formik.values.usuario_empresa)?.nombre_usuario || ""}}
                                onChange={(e) => {formik.setFieldValue('usuario_empresa', parseInt((e as TSelectOption)?.value))}}
                                onBlur={formik.handleBlur}
                            /> */}
                            <Card className="h-full">
                                <CardHeader>
                                    <CardHeaderChild>
                                        <Badge className="text-lg">Usuarios</Badge>
                                    </CardHeaderChild>
                                    <CardHeaderChild>
                                        <Input
                                            name="globalFilter"
                                            placeholder="Buscar..."
                                            value={globalFilter}
                                            onChange={(e) => { setGlobalFilter(e.target.value) }}
                                        />
                                    </CardHeaderChild>
                                </CardHeader>
                                <CardBody className='overflow-auto max-h-[50vh]'>
                                    <Table className='table-fixed'>
                                        <THead>
                                            {table.getHeaderGroups().map((headerGroup) => (
                                                <Tr key={headerGroup.id}>
                                                    {headerGroup.headers.map((header) => (
                                                        <Th
                                                            key={header.id}
                                                            isColumnBorder={false}
                                                            className='text-left'>
                                                            {header.isPlaceholder ? null : (
                                                                <div
                                                                    key={header.id}
                                                                    aria-hidden='true'
                                                                    {...{
                                                                        className: header.column.getCanSort()
                                                                            ? 'cursor-pointer select-none flex items-center'
                                                                            : '',
                                                                        onClick:
                                                                            header.column.getToggleSortingHandler(),
                                                                    }}>
                                                                    {flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext(),
                                                                    )}
                                                                    {{
                                                                        asc: (
                                                                            <Icon
                                                                                icon='HeroChevronUp'
                                                                                className='ltr:ml-1.5 rtl:mr-1.5'
                                                                            />
                                                                        ),
                                                                        desc: (
                                                                            <Icon
                                                                                icon='HeroChevronDown'
                                                                                className='ltr:ml-1.5 rtl:mr-1.5'
                                                                            />
                                                                        ),
                                                                    }[header.column.getIsSorted() as string] ?? null}
                                                                </div>
                                                            )}
                                                        </Th>
                                                    ))}
                                                </Tr>
                                            ))}
                                        </THead>
                                        <TBody>
                                            {table.getRowModel().rows.map((row) => (
                                                <Tr className={`hover:cursor-pointer ${formik.values.usuario_empresa === row.original.id ? "bg-blue-500 text-white" : ""}`} key={row.id} onClick={() => { if (formik.values.usuario_empresa === row.original.id) { formik.setFieldValue('usuario_empresa', 0); setUsuarioSeleccionado(undefined) } else { formik.setFieldValue('usuario_empresa', row.original.id); setUsuarioSeleccionado(row.original) } }}>
                                                    {row.getVisibleCells().map((cell) => (
                                                        <Td key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </Td>
                                                    ))}
                                                </Tr>
                                            ))}
                                        </TBody>
                                    </Table>
                                    <div className="mt-2">
                                        <TableCardFooterTemplateV2 table={table} />
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-span-12 lg:col-span-6 order-2">
                            <Card className="h-full">
                                <CardHeader>
                                    <Badge className="text-lg">Fechas</Badge>
                                </CardHeader>
                                <CardBody className="flex flex-col">
                                    <div className="flex justify-center">
                                        <DateRange
                                            minDate={new Date()}
                                            editableDateInputs
                                            onChange={(item) => setState([item.selection])}
                                            moveRangeOnFirstSelection={false}
                                            ranges={state}
                                            color={"#3b82f6"}
                                            locale={es}
                                        />
                                    </div>
                                    <div>
                                        <Badge className="text-lg" color="red">{formik.errors.fecha_fin}</Badge>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-span-12 order-3">
                            <Card>
                                <CardHeader>
                                    <Badge className="text-lg">Comentario</Badge>
                                </CardHeader>
                                <CardBody>
                                    <Textarea
                                        rows={4}
                                        name="comentario"
                                        value={formik.values.comentario}
                                        onChange={formik.handleChange}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </Container>
        </PageWrapper>
    )
}

export default PedirVacaciones