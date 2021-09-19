import { useState } from 'react';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { playerAction } from '../../redux-store/use-player';
import classes from './TeamList.module.css';
import avtarImage from '../../Images/avatar.png';

const TeamList = (props) => {
  const { players, id } = props;
  const { player, point, team, category } = players;
  const [enabel, setEnabel] = useState();

  const dispatch = useDispatch();
  const playerItem = useSelector((state) => state.Team1.list);
  const totalSpotleft = useSelector((state) => state.Team1.totalSpot);
  let button = false;

  const addHandler = () => {
    if (totalSpotleft > 0) {
      dispatch(
        playerAction.addPlayerHandler({
          id,
          player,
          point,
          team,
          category,
        })
      );
    }
  };

  const removeHandler = () => {
    dispatch(playerAction.removePlayerHandler(id));
    setEnabel(false);
  };

  playerItem.find((items) => {
    if (items.id === id) {
      button = true;
    }
  });

  if (enabel) {
    button = true;
  }

  return (
    <article className={classes.players}>
      <img src={avtarImage} alt="player" />
      <p className={classes.name}>{player}</p>
      <p className={classes.team}>{point}</p>
      <p className={classes.point}>{team}</p>
      <div className={classes.teamListButton}>
        <button onClick={addHandler} disabled={button}>
          <FaPlusCircle />
        </button>
        <button onClick={removeHandler} disabled={!button}>
          <FaMinusCircle />
        </button>
      </div>
    </article>
  );
};
export default TeamList;
