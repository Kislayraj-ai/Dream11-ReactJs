import { configureStore } from '@reduxjs/toolkit';
import playerData from './use-player';
import createContest from './use-create';

const Store = configureStore({
  reducer: { Team1: playerData.reducer, contest: createContest.reducer },
});

export default Store;
