import { createSlice } from '@reduxjs/toolkit';

const createContest = createSlice({
  name: 'contest',
  initialState: { contest: [] },
  reducers: {
    addContest(state, action) {
      let newContest = action.payload;

      state.contest.push({
        id: newContest.id,
        name: newContest.name,
        total: newContest.totalWin,
        spot: newContest.spot,
        pay: newContest.pay,
      });
    },
    deleteContestHandler(state, action) {
      let contestId = action.payload;

      state.contest = state.contest.filter(
        (contest) => contest.id !== contestId
      );
    },
    replaceContest(state, action) {
      state.contest = action.payload.contest;
    },
  },
});

export const createContestAction = createContest.actions;
export default createContest;
