import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createContestAction } from '../redux-store/use-create';
import { useHistory, Link, Prompt } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useValidation from '../hooks/use-validation';
import classes from './CreateContest.module.css';
import Button from '../components/UI/Button';
import Header from '../components/UI/Header';
import Card from '../components/UI/Card';

const CreateContest = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let Storage = JSON.parse(localStorage.getItem('name'));
  if (!Storage) {
    history.push('/login');
  }
  const {
    value: name,
    validValue: nameIsValid,
    valueHandler: nameHandler,
    hasError: errorName,
    blurHandler: nameBlurHandler,
  } = useValidation((value) => value.trim() !== '');
  const {
    value: totalWin,
    validValue: totalIsValid,
    valueHandler: totalHandler,
    hasError: errortotal,
    blurHandler: totalBlurHandler,
  } = useValidation((value) => value >= 0);
  const {
    value: spot,
    validValue: spotIsValid,
    valueHandler: spotHandler,
    hasError: errorSpot,
    blurHandler: spotBlurHandler,
  } = useValidation((state) => state > 0);
  const {
    value: pay,
    validValue: payIsValid,
    valueHandler: payHandler,
    hasError: errorPay,
    blurHandler: payBlurHandler,
  } = useValidation((state) => state > 0);

  const submitHandler = (e) => {
    e.preventDefault();
    const id = new Date().getTime();

    if (nameIsValid && totalIsValid && payIsValid && spotIsValid) {
      dispatch(
        createContestAction.addContest({
          id,
          name,
          totalWin,
          spot,
          pay,
        })
      );

      history.push('/homepage');
    }
  };
  const [isEntering, setIsEntering] = useState(false);
  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusHandler = () => {
    setIsEntering(true);
  };

  return (
    <>
      <Prompt
        when={isEntering}
        message={(location) => 'Are you sure you want to leave ?'}
      ></Prompt>
      <Card className={classes.mainContainer}>
        <Header>
          <Link to="/homepage" className="links">
            <h4>
              <FaArrowLeft />
              HomePage
            </h4>
          </Link>
        </Header>
        <form
          onSubmit={submitHandler}
          className={classes['contest-container']}
          onFocus={formFocusHandler}
        >
          <h1>Create Contest</h1>
          <label>Contest Name</label>
          <input
            value={name}
            onChange={nameHandler}
            onBlur={nameBlurHandler}
            type="text"
          />
          {errorName && <p className="error">Name can't be empthy</p>}

          <label>Total Winning</label>
          <input
            value={totalWin}
            onBlur={totalBlurHandler}
            onChange={totalHandler}
            type="number"
          />
          {errortotal && <p className="error">Total can't ne negative</p>}

          <label>Amount for Participation</label>
          <input
            value={pay}
            onChange={payHandler}
            onBlur={payBlurHandler}
            type="number"
          />
          {errorPay && <p className="error">PayAmount can't ne negative</p>}

          <label>Total Spot</label>
          <input
            value={spot}
            onBlur={spotBlurHandler}
            onChange={spotHandler}
            type="number"
          />
          {errorSpot && <p className="error">Spot should be less than 0</p>}

          <Button
            className={classes.createButton}
            onClick={finishEnteringHandler}
          >
            Create Contest
          </Button>
        </form>
      </Card>
    </>
  );
};

export default CreateContest;
