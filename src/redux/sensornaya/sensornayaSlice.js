import {
  deleteSensornayaLessonById,
  sensornayaLessons,
  updateSensornayaLesson,
} from './sensornayaOperetion';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  lessonsSensornaya: [],
  isloading: false,
  marker: null,
  operetion: null,
  error: null,
};

const sensornayaSlice = createSlice({
  name: 'sensornaya',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sensornayaLessons.pending, state => {
        state.isloading = true;
        state.operetion = 'sensornayaLessons';
      })
      .addCase(sensornayaLessons.fulfilled, (state, { payload }) => {
        state.isloading = false;
        state.operetion = null;
        state.error = null;
        state.lessonsSensornaya = payload;
      })
      .addCase(sensornayaLessons.rejected, (state, action) => {
        state.isloading = false;
        state.operetion = null;
        state.error = action.payload;
      })
      .addCase(updateSensornayaLesson.pending, state => {
        state.isloading = true;
        state.operetion = 'addLesson';
      })
      .addCase(updateSensornayaLesson.fulfilled, (state, action) => {
        state.isloading = false;
        state.operetion = null;
        state.error = null;
        const id = action.payload._id;
        const indexLesson = state.lessonsSensornaya.findIndex(
          vel => vel._id === id
        );
        if (indexLesson !== -1) {
          state.lessonsSensornaya[indexLesson] = action.payload;
        }
        // const index = state.choseLesson.findIndex(vel => vel._id === id);
        // if (index !== -1) {
        //   state.choseLesson[index] = action.payload;
        // }
      })
      .addCase(updateSensornayaLesson.rejected, (state, action) => {
        state.isloading = false;
        state.operetion = null;
        state.error = action.payload;
      })
      .addCase(deleteSensornayaLessonById.pending, (state, { meta }) => {
        state.operetion = `${meta.arg}`;
        state.isloading = true;
      })
      .addCase(deleteSensornayaLessonById.fulfilled, (state, action) => {
        state.operetion = null;
        state.isloading = false;
        state.error = null;
        const id = action.meta.arg;
        const indexLesson = state.lessonsSensornaya.findIndex(
          vel => vel._id === id
        );
        if (indexLesson !== -1) {
          state.lessonsSensornaya.splice(indexLesson, 1);
        }
      })
      .addCase(deleteSensornayaLessonById.rejected, (state, action) => {
        state.operetion = null;
        state.isloading = false;
        state.error = action.payload;
      });
  },
});

export const sensornayaReducer = sensornayaSlice.reducer;