import { configureStore } from '@reduxjs/toolkit';
import { currentPageReducer } from './pagesSlice';
import { selectedExerciseReducer } from './selectedExerciseSlice';
import { errorsStatusReducer } from './errorsStatusSlice';

export default configureStore({
    reducer: {
        currentPage: currentPageReducer,
        selectedExercise: selectedExerciseReducer,
        errorsStatus: errorsStatusReducer,
    },
});
