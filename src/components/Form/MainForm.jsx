import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import useValidation from '../../hooks/use-validation';
import icon from '../../Images/icon.png';
import classes from './MainForm.module.css';

const MainForm = (props) => {
  let formIsValid = false;
  const {
    value: nameInput,
    validValue: nameIsValid,
    valueHandler: nameHandler,
    hasError: errorName,
    blurHandler: nameBlurHandler,
  } = useValidation((value) => value.trim() !== '');

  const {
    value: passInput,
    validValue: passIsValid,
    valueHandler: passHandler,
    hasError: errorPass,
    blurHandler: passBlurHandler,
  } = useValidation((value) => value.trim().length > 6);

  if (nameIsValid && passIsValid) {
    formIsValid = true;
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Mainform');
    props.onLogin(true);
    if (!passIsValid && !nameIsValid) return;
  };
  useEffect(() => {
    localStorage.setItem('name', JSON.stringify(nameInput));
  }, [nameInput]);

  return (
    <Card className={classes['form-container']}>
      <div>
        <img src={icon} alt="icon" />

        <h1>
          Dream<span>11</span>
        </h1>
      </div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="name"
          onChange={nameHandler}
          onBlur={nameBlurHandler}
          value={nameInput}
        />
        {errorName && <p className="error">Name Can't be Empty</p>}
        <input
          type="password"
          value={passInput}
          onChange={passHandler}
          onBlur={passBlurHandler}
          placeholder="password"
        />
        {errorPass && <p className="error">Passsword greater than 6 </p>}
        <Link to="/homepage">
          <button disabled={!formIsValid}>Submit</button>
        </Link>
      </form>
    </Card>
  );
};

export default MainForm;
