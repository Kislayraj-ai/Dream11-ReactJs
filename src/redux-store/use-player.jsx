import { createSlice } from '@reduxjs/toolkit';

const playerData = createSlice({
  name: 'Team1',
  initialState: { list: [], totalSpot: 11 },

  reducers: {
    addPlayerHandler(state, action) {
      let newPlayers = action.payload;
      state.totalSpot--;
      state.list.push({
        id: newPlayers.id,
        name: newPlayers.player,
        point: newPlayers.point,
        team: newPlayers.team,
        category: newPlayers.category,
      });
    },
    removePlayerHandler(state, action) {
      let newPlayerId = action.payload;
      state.totalSpot++;
      state.list = state.list.filter((player) => player.id !== newPlayerId);
    },
    deleteTeam(state) {
      state.list = [];
      state.totalSpot = 11;
    },
    replaceTeam(state, action) {
      state.list = action.payload.list;
      state.totalSpot = action.payload.totalSpot;
    },
  },
});

export const playerAction = playerData.actions;
export default playerData;
