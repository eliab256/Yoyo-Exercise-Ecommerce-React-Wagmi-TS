import { configureStore } from '@reduxjs/toolkit';
import { currentPageReducer } from './pagesSlice';
import { selectedExerciseReducer } from './selectedExerciseSlice';

export default configureStore({
    reducer: {
        currentPage: currentPageReducer,
        selectedExercise: selectedExerciseReducer,
    },
});
