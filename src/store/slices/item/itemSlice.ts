import { ICategoria, IFabricante, IItem, IItemEmpresa, IProveedorEmpresa } from "@/interface/items.interface"
import ApiService from "@/services/ApiService"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export interface ItemState {
    loading: boolean
    error: string | undefined
    listaCategorias: ICategoria[]
    listaFabricante: IFabricante[]
    listaProveedoresEmpresa: IProveedorEmpresa[]
    detalleProveedorEmpresa: IProveedorEmpresa | undefined
    listaItemsEmpresaProveedor: IItemEmpresa[]
    listaItemsEmpresa: IItemEmpresa[]
    detalleItemEmpresa: IItemEmpresa | undefined
    listaImagenesItem: IItem[]
    detalleFabricante: IFabricante | undefined
    detalleCategoria: ICategoria | undefined
    listaItemsNoProveedor: IItemEmpresa[]
}

const initialState: ItemState = {
    loading: false,
    error: undefined,
    listaCategorias:[],
    listaFabricante: [],
    listaProveedoresEmpresa: [],
    detalleProveedorEmpresa: undefined,
    listaItemsEmpresaProveedor: [],
    listaItemsEmpresa: [],
    detalleItemEmpresa: undefined,
    listaImagenesItem: [],
    detalleFabricante: undefined,
    detalleCategoria: undefined,
    listaItemsNoProveedor: []
}

export const detalleCategoriaThunk = createAsyncThunk<ICategoria, {id_categoria: number | string | undefined}, {rejectValue: string}>(
    'item/detalleCategoriaThunk',
    async ({id_categoria}, {rejectWithValue}) => {
        try {
            const response = await ApiService.fetchData<ICategoria>({url: `/api/categorias/${id_categoria}/`, method: 'get'})
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const detalleFabricanteThunk = createAsyncThunk<IFabricante, {id_fabricante: number | string | undefined}, {rejectValue: string}>(
    'item/detalleFabricanteThunk',
    async ({id_fabricante}, {rejectWithValue}) => {
        try {
            const response = await ApiService.fetchData<IFabricante>({url: `/api/fabricantes/${id_fabricante}/`, method: 'get'})
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)

        }

    }
)
export const listaItemsNoProveedorThunk = createAsyncThunk<IItemEmpresa[], {id_proveedor: string | number | undefined, id_empresa: string | number | undefined}, {rejectValue: string}>(
    'item/listaItemsNoProveedorThunk',
    async ({id_proveedor, id_empresa}, {rejectWithValue}) => {
        try {
            const response = await ApiService.fetchData<IItemEmpresa[]>({url: `/api/empresas/${id_empresa}/items-empresa/items-sin-proveedor/?proveedor_id=${id_proveedor}`, method: 'get'})
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.detail)
        }
    }
)

export const detalleItemEmpresaThunk = createAsyncThunk<IItemEmpresa, {id_empresa: number | string | undefined, id_item: number | string | undefined}, {rejectValue: string}>(
    'item/detalleItemEmpresaThunk',
    async ({id_empresa, id_item}, {rejectWithValue}) => {
        try {
            const response = await ApiService.fetchData<IItemEmpresa>({url: `/api/empresas/${id_empresa}/items-empresa/${id_item}/`, method: 'get'})
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const listaItemsEmpresaProveedorThunk = createAsyncThunk<IItemEmpresa[], {id_proveedor: string | number | undefined, id_empresa: number | string | null | undefined}, {rejectValue: string}>(
    'item/listaItemsEmpresaProveedorThunk',
    async ({id_empresa, id_proveedor}, {rejectWithValue}) => {
        try {
            const response = await ApiService.fetchData<IItemEmpresa[]>({url: `/api/empresas/${id_empresa}/proveedores-empresa/${id_proveedor}/items/`, method: 'get'})
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const detalleProveedorEmpresaThunk = createAsyncThunk<IProveedorEmpresa, {id_proveedor: number | string | undefined, id_empresa: null | number | string | undefined}, {rejectValue: string}>(
    'item/detalleProveedorEmpresaThunk',
    async ({id_proveedor, id_empresa}, {rejectWithValue}) => {
        try {
            const response = await ApiService.fetchData<IProveedorEmpresa>({url: `/api/empresas/${id_empresa}/proveedores-empresa/${id_proveedor}/`, method: 'get'})
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const listaProveedoresEmpresaThunk = createAsyncThunk<IProveedorEmpresa[], {id_empresa: string | number | undefined | null}, {rejectValue: string}>(
    'item/listaProveedoresEmpresaThunk',
    async ({id_empresa}, {rejectWithValue}) => {
        try {
            const response = await ApiService.fetchData<IProveedorEmpresa[]>({url: `/api/empresas/${id_empresa}/proveedores-empresa`, method: 'get'})
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const listaItemsEmpresaThunk = createAsyncThunk<IItemEmpresa[], {id_empresa: string | number | undefined | null}, {rejectValue: string}>(
    'item/listaItemsEmpresaThunk',
    async ({id_empresa}, {rejectWithValue}) => {
        try {
            const response = await ApiService.fetchData<IItemEmpresa[]>({url: `/api/empresas/${id_empresa}/items-empresa/`, method: 'get'})
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const listaCategoriasThunk = createAsyncThunk<ICategoria[], undefined, {rejectValue: string}>(
    'item/listaCategoriasThunk',
    async (_, {rejectWithValue}) => {
        try {
            const response = await ApiService.fetchData<ICategoria[]>({url: `/api/categorias/`, method: 'get'})
            return response.data
        } catch(error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const listaFabricanteThunk = createAsyncThunk<IFabricante[], undefined, {rejectValue: string}>(
    'item/listaFabricanteThunk',
    async (_, {rejectWithValue}) => {
        try {
            const response = await ApiService.fetchData<IFabricante[]>({url: `/api/fabricantes/`, method: 'get'})
            return response.data
        } catch(error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const listaimagenesItemThunk = createAsyncThunk<IItem[], {id_item: number | string | undefined}, {rejectValue: string}>(
    'item/listaimagenesItemThunk',
    async ({}, {rejectWithValue}) => {
        try {
            const response = await ApiService.fetchData<IItem[]>({url: `/api/imagenes-item/`, method: 'get'})
            return response.data
        } catch(error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const itemSlice = createSlice({
    name: 'item/itemSlice',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
            .addCase(listaCategoriasThunk.pending, (state)=>{
                state.loading = true
            })
            .addCase(listaCategoriasThunk.fulfilled, (state, action) =>{
                state.loading = false
                state.listaCategorias = action.payload
            })
            .addCase(listaCategoriasThunk.rejected, (state, action) =>{
                state.loading = false
                state.error = action.payload
            })
            .addCase(listaFabricanteThunk.pending, (state)=>{
                state.loading = true
            })
            .addCase(listaFabricanteThunk.fulfilled, (state, action) =>{
                state.loading = false
                state.listaFabricante = action.payload
            })
            .addCase(listaFabricanteThunk.rejected, (state, action) =>{
                state.loading = false
                state.error = action.payload
            })
            .addCase(listaProveedoresEmpresaThunk.pending, (state)=>{
                state.loading = true
            })
            .addCase(listaProveedoresEmpresaThunk.fulfilled, (state, action) =>{
                state.loading = false
                state.listaProveedoresEmpresa = action.payload
            })
            .addCase(listaProveedoresEmpresaThunk.rejected, (state, action) =>{
                state.loading = false
                state.error = action.payload
            })
            .addCase(detalleProveedorEmpresaThunk.pending, (state)=>{
                state.loading = true
            })
            .addCase(detalleProveedorEmpresaThunk.fulfilled, (state, action) =>{
                state.loading = false
                state.detalleProveedorEmpresa = action.payload
            })
            .addCase(detalleProveedorEmpresaThunk.rejected, (state, action) =>{
                state.loading = false
                state.error = action.payload
            })
            .addCase(listaItemsEmpresaProveedorThunk.pending, (state)=>{
                state.loading = true
            })
            .addCase(listaItemsEmpresaProveedorThunk.fulfilled, (state, action) =>{
                state.loading = false
                state.listaItemsEmpresaProveedor = action.payload
            })
            .addCase(listaItemsEmpresaProveedorThunk.rejected, (state, action) =>{
                state.loading = false
                state.error = action.payload
            })
            .addCase(listaItemsEmpresaThunk.pending, (state)=>{
                state.loading = true
            })
            .addCase(listaItemsEmpresaThunk.fulfilled, (state, action) =>{
                state.loading = false
                state.listaItemsEmpresa = action.payload
            })
            .addCase(listaItemsEmpresaThunk.rejected, (state, action) =>{
                state.loading = false
                state.error = action.payload
            })
            .addCase(detalleItemEmpresaThunk.pending, (state)=>{
                state.loading = true
            })
            .addCase(detalleItemEmpresaThunk.fulfilled, (state, action) =>{
                state.loading = false
                state.detalleItemEmpresa = action.payload
            })
            .addCase(detalleItemEmpresaThunk.rejected, (state, action) =>{
                state.loading = false
                state.error = action.payload
            })
            .addCase(listaimagenesItemThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(listaimagenesItemThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.listaImagenesItem = action.payload;
            })
            .addCase(listaimagenesItemThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(detalleFabricanteThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(detalleFabricanteThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.detalleFabricante = action.payload;
            })
            .addCase(detalleFabricanteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(detalleCategoriaThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(detalleCategoriaThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.detalleCategoria = action.payload;
            })
            .addCase(detalleCategoriaThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(listaItemsNoProveedorThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(listaItemsNoProveedorThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.listaItemsNoProveedor = action.payload;
            })
            .addCase(listaItemsNoProveedorThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export const {} = itemSlice.actions
export default itemSlice.reducer

