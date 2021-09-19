import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Featured } from './Data';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import TeamList from './TeamList';
import Header from '../UI/Header';
import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './Team.module.css';

const MyTeam = () => {
  const [playerlist, setPlayerList] = useState([]);
  const lists = [...new Set(Featured.map((item) => item.category))];
  const items = useSelector((state) => state.Team1.list);
  const totalSpotleft = useSelector((state) => state.Team1.totalSpot);
  const history = useHistory();
  const nameStorage = JSON.parse(localStorage.getItem('name'));
  if (!nameStorage) {
    history.push('/login');
  }
  useEffect(() => {
    setPlayerList(
      Featured.filter((item) => {
        if (item.category === 'wicket keeper') {
          return item;
        }
      })
    );
  }, []);

  const TabsHandler = (e) => {
    setPlayerList(
      Featured.filter((item) => {
        if (item.category === e.target.textContent) {
          return item;
        }
      })
    );
  };

  let totalPoint = items.reduce(function (acc, curr) {
    return acc + curr.point;
  }, 0);

  let totalCredit = 100;
  totalCredit -= totalPoint;
  if (totalPoint < 0) {
    totalCredit = 0;
  }
  let spotFull = false;
  if (totalSpotleft === 0) {
    spotFull = true;
  }
  return (
    <Card className="contianer">
      <Header className={classes.createTeamHeader}>
        <Link to="/myteam" className="links">
          <h4>
            <FaArrowLeft /> MyTeam
          </h4>
        </Link>
        <Link className="links" to="/viewTeam">
          <Button>View Team</Button>
        </Link>
      </Header>
      <div className={classes.info}>
        <h4 className={classes.credit}>Spot left :{totalSpotleft}</h4>

        {spotFull && <p>No More Spot Left </p>}
        <h4 className={classes.credit}>credit left: {totalCredit}</h4>
      </div>
      <div className={classes.tabs}>
        <nav className={classes['tabs-nav']}>
          <ul>
            {lists.map((item) => {
              return (
                <li onClick={TabsHandler} key={item}>
                  {item}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {playerlist.map((players) => (
        <TeamList players={players} key={players.id} id={players.id} />
      ))}
      <div></div>
    </Card>
  );
};

export default MyTeam;
