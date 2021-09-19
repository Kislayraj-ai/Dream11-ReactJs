import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import classes from './ViewTeam.module.css';
import images from '../../Images/avatar.png';
import Card from '../UI/Card';
import Header from '../UI/Header';
import { FaArrowLeft } from 'react-icons/fa';

const ViewTeam = () => {
  const items = useSelector((state) => state.Team1.list);
  const wk = items.filter((item) => item.category === 'wicket keeper');
  const bats = items.filter((item) => item.category === 'batsmen');
  const allRounder = items.filter((item) => item.category === 'all-rounder');
  const bowler = items.filter((item) => item.category === 'bowler');
  const history = useHistory();
  const nameStorage = JSON.parse(localStorage.getItem('name'));
  if (!nameStorage) {
    history.push('/login');
  }
  return (
    <Card className={classes.viewContainer}>
      <Header>
        <Link to="/myteam" className="links">
          <h4>
            <FaArrowLeft /> MyTeam
          </h4>
        </Link>
      </Header>

      <section className={classes.viewteam}>
        <div className={classes.wk}>
          {wk.map((item) => (
            <div key={item.name}>
              <img src={images} alt="player"></img>
              <p>{item.name}</p>
              <p>{item.point}</p>
            </div>
          ))}
        </div>

        <div className={classes.batsmen}>
          {bats.map((item) => (
            <div key={item.name}>
              <img src={images} alt="player"></img>
              <p>{item.name}</p>
              <p>{item.point}</p>
            </div>
          ))}
        </div>
        <div className={classes.all}>
          {allRounder.map((item) => (
            <div key={item.name}>
              <img src={images} alt="player"></img>
              <p>{item.name}</p>
              <p>{item.point}</p>
            </div>
          ))}
        </div>
        <div className={classes.bowler}>
          {bowler.map((item) => (
            <div key={item.name}>
              <img src={images} alt="player"></img>
              <p>{item.name}</p>
              <p>{item.point}</p>
            </div>
          ))}
        </div>
      </section>
    </Card>
  );
};
export default ViewTeam;
