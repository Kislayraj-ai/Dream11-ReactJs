import Card from '../components/UI/Card';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCaretUp } from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createContestAction } from '../redux-store/use-create';
import Button from '../components/UI/Button';
import Header from '../components/UI/Header';
import classes from './Join.module.css';

const JoinContest = () => {
  const { id } = useParams();

  let newContestList = useSelector((state) => state.contest.contest);
  const history = useHistory();
  let nameStorage = JSON.parse(localStorage.getItem('name'));
  if (!nameStorage) {
    history.push('/login');
  }

  let contestList = newContestList.filter((item) => {
    if (item.id === parseInt(id)) {
      return item;
    }
  });
  const StorageName = JSON.parse(localStorage.getItem('name'));

  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(createContestAction.deleteContestHandler(parseInt(id)));
    history.push('/homepage');
  };
  return (
    <Card>
      <Header>
        <Link to="/homepage" className="links">
          <h4>
            <FaArrowLeft /> HomePage
          </h4>
        </Link>
      </Header>
      {contestList.map((contest) => (
        <div className={classes.join} id={contest.id} key={contest.id}>
          <h3>{contest.name}</h3>
          <h3>Total Winnings :</h3>
          <p>₹ {contest.total}</p>
          <h3>Spot left :</h3>
          <p>{parseInt(contest.spot) - 1}</p>
          <br />
        </div>
      ))}

      <article className={classes['join-details']}>
        <p>#1</p>
        <FaCaretUp className={classes.icon} />
        <p>1st</p>
        <p>{StorageName}</p>
        <p>Team1</p>
      </article>
      <Button onClick={deleteHandler} className={classes.delete}>
        Delete Contest
      </Button>
    </Card>
  );
};

export default JoinContest;
