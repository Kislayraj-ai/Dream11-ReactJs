import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { playerAction } from '../redux-store/use-player';
import { FaArrowLeft } from 'react-icons/all';
import Button from '../components/UI/Button';
import Header from '../components/UI/Header';
import Card from '../components/UI/Card';
import classes from './Myteam.module.css';

const MyTeam = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.Team1.list);

  const DeleteHandler = () => {
    dispatch(playerAction.deleteTeam());
  };
  return (
    <Card className={classes.myteam}>
      <Header>
        <Link to="/homepage" className="links">
          <h4>
            <FaArrowLeft /> Contest
          </h4>
        </Link>
      </Header>
      <div className={classes.back}>
        <div className={classes['button-container']}>
          <Button>
            <Link to="/createTeam" className={`links ${classes.link}`}>
              Create Team
            </Link>
          </Button>
          <Button>
            <Link to="/viewTeam" className={`links ${classes.link}`}>
              View Team
            </Link>
          </Button>
          {list.length > 1 && (
            <Button onClick={DeleteHandler}>Delete Team</Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MyTeam;
