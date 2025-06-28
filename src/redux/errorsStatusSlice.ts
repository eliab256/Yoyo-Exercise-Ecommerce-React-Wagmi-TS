import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type statusType = 'loading' | 'success' | 'error' | null;

interface ErrorsStatusState {
    connection: statusType;
    balance: statusType;
    alreadyPurchased: statusType;
}

const initialState: ErrorsStatusState = {
    connection: null,
    balance: null,
    alreadyPurchased: null,
};

export const errorsStatusSlice = createSlice({
    name: 'errorsStatus',
    initialState,
    reducers: {
        setConnectionStatus: (state, action: PayloadAction<statusType>) => {
            state.connection = action.payload;
        },
        setBalanceStatus: (state, action: PayloadAction<statusType>) => {
            state.balance = action.payload;
        },
        setAlreadyPurchasedStatus: (state, action: PayloadAction<statusType>) => {
            state.alreadyPurchased = action.payload;
        },
        resetErrorsStatus: () => initialState,
    },
});

export const { setConnectionStatus, setBalanceStatus, setAlreadyPurchasedStatus, resetErrorsStatus } =
    errorsStatusSlice.actions;

export const errorsStatusReducer = errorsStatusSlice.reducer;
