import { playerAction } from '../redux-store/use-player';
import { createContestAction } from '../redux-store/use-create';

export const setData = (content, name) => {
  return async () => {
    const sendData = async () => {
      const response = await fetch(
        `https://dream11-8d315-default-rtdb.firebaseio.com/${name}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(content),
        }
      );
      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }
    };
    try {
      await sendData();
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const fetchTeam = () => {
  return async (dispatch) => {
    const fetchTemaData = async () => {
      const response = await fetch(
        `https://dream11-8d315-default-rtdb.firebaseio.com/team.json`
      );
      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }
      const data = await response.json();

      dispatch(
        playerAction.replaceTeam({
          list: data.list || [],
          totalSpot: data.totalSpot,
        })
      );
    };
    try {
      await fetchTemaData();
    } catch (e) {
      console.log(e.message);
    }
  };
};
export const fetchContest = () => {
  return async (dispatch) => {
    const fetchContestData = async () => {
      const response = await fetch(
        `https://dream11-8d315-default-rtdb.firebaseio.com/AllContest.json`
      );
      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }
      const data = await response.json();

      dispatch(
        createContestAction.replaceContest({
          contest: data.contest || [],
        })
      );
    };
    try {
      await fetchContestData();
    } catch (e) {
      console.log(e.message);
    }
  };
};
