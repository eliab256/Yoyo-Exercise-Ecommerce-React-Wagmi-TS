import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ExerciseId = number | null;

interface SelectedExerciseState {
    id: ExerciseId;
}

const initialState: SelectedExerciseState = {
    id: null,
};

export const selectedExerciseSlice = createSlice({
    name: 'selectedExercise',
    initialState,
    reducers: {
        setSelectedExercise: (state, action: PayloadAction<ExerciseId>) => {
            state.id = action.payload;
        },
        clearSelectedExercise: state => {
            state.id = null;
        },
    },
});

export const { setSelectedExercise, clearSelectedExercise } = selectedExerciseSlice.actions;

export const selectedExerciseReducer = selectedExerciseSlice.reducer;
