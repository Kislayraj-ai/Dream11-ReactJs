import { FaPlusCircle, FaHandsHelping, FaTshirt } from 'react-icons/all';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import classes from './HomePage.module.css';
import logo from '../Images/logo.png';

const HomePage = () => {
  const ContestList = useSelector((state) => state.contest.contest);
  let history = useHistory();
  let Storage = JSON.parse(localStorage.getItem('name'));
  if (!Storage) {
    history.push('/login');
  }

  return (
    <Card className={classes.container}>
      <div className={classes.head}>
        <img src={logo} className={classes.logo} alt="logo" />
        <Link className="links" to="/viewTeam">
          <Button>View Team</Button>
        </Link>
      </div>

      <div className={classes.options}>
        <Link to="/createContest" className="links">
          <h4>
            Create Contest <FaPlusCircle />
          </h4>
        </Link>
        <Link to="/myteam" className="links">
          <h4>
            My Team <FaTshirt />
          </h4>
        </Link>

        <a href="https://get.dream11.help/hc/en-us" className="links">
          <h4>
            Help Center <FaHandsHelping />
          </h4>
        </a>
      </div>
      {!ContestList.length > 0 && (
        <h2 className={classes.noContest}>Create and Play </h2>
      )}
      {ContestList.map((item) => (
        <article id={item.id} key={item.id} className={classes.contestList}>
          <div>
            <h3>{item.name}</h3>
            <h3>Pool ₹{item.total}</h3>

            <Link to={`/join/${item.id}`} className={`links`}>
              <Button className={classes.pay}>Fee ₹{item.pay} </Button>
            </Link>
          </div>
          <div className={classes.spots}>
            <p>spot left {item.spot}</p>
            <p>total spot {item.spot}</p>
            <p>join now</p>
          </div>
        </article>
      ))}
    </Card>
  );
};

export default HomePage;
