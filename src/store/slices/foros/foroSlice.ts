import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "@/services/ApiService";
import { IForo } from "@/interface/foro.interface";

export interface ForoState {
    foros: IForo[];
    loading: boolean;
    error: string | undefined;
}

const initialState: ForoState = {
    foros: [],
    loading: false,
    error: undefined,
};

export const fetchForosThunk = createAsyncThunk<IForo[], void, { rejectValue: string }>(
    "foro/fetchForosThunk",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ApiService.fetchData<IForo[]>({
                url: "/api/foros/",
                method: "get",
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createForoThunk = createAsyncThunk<IForo, void, { rejectValue: string }>(
    "foro/createForoThunk",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ApiService.fetchData<IForo>({
                url: "/api/foros/",
                method: "post",
                
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateForoThunk = createAsyncThunk<IForo, { id: number; foro: IForo }, { rejectValue: string }>(
    "foro/updateForoThunk",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await ApiService.fetchData<IForo>({
                url: `/api/foros/${id}/`,
                method: "put",
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteForoThunk = createAsyncThunk<number, number, { rejectValue: string }>(
    "foro/deleteForoThunk",
    async (id, { rejectWithValue }) => {
        try {
            await ApiService.fetchData<void>({
                url: `/api/foros/${id}/`,
                method: "delete",
            });
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const foroSlice = createSlice({
    name: "foro",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchForosThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchForosThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.foros = action.payload;
            })
            .addCase(fetchForosThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createForoThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createForoThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.foros.push(action.payload);
            })
            .addCase(createForoThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateForoThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateForoThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.foros.findIndex((foro) => foro.id === action.payload.id);
                if (index !== -1) {
                    state.foros[index] = action.payload;
                }
            })
            .addCase(updateForoThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteForoThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteForoThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.foros = state.foros.filter((foro) => foro.id !== action.payload);
            })
            .addCase(deleteForoThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default foroSlice.reducer;