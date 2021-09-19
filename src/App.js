import React, { useState, useEffect, Suspense } from 'react';
import MainForm from './components/Form/MainForm';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setData, fetchTeam, fetchContest } from './hooks/use-databse';
import Team from './components/Team/Team';
import Loading from './components/UI/Loading';

function App() {
  const [login, setlogin] = useState();
  const playerList = useSelector((state) => state.Team1);
  const contestSendData = useSelector((state) => state.contest.contest);

  const NotFound = React.lazy(() => import('./pages/NotFound'));
  const HomePage = React.lazy(() => import('./pages/HomePage'));

  const ViewTeam = React.lazy(() => import('./components/Team/ViewTeam'));
  const MyTeam = React.lazy(() => import('./pages/MyTeam'));
  const CreateContest = React.lazy(() => import('./pages/CreateContest'));
  const JoinContest = React.lazy(() => import('./pages/Join'));

  const loginhandler = () => {
    setlogin(true);
  };

  const dispatch = useDispatch();

  //*********send and fetch*****///

  useEffect(() => {
    dispatch(setData({ contest: contestSendData }, 'AllContest'));
  }, [dispatch, contestSendData]);

  useEffect(() => {
    dispatch(fetchContest(dispatch));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchTeam(dispatch));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      setData(
        { list: playerList.list, totalSpot: playerList.totalSpot },
        'team'
      )
    );
  }, [playerList, dispatch]);

  //********** */

  return (
    <>
      <Router>
        <Suspense
          fallback={
            <div className="centered">
              <Loading />
            </div>
          }
        >
          <Switch>
            <Route path="/" exact>
              <Redirect to="/login">
                {!login && <MainForm onLogin={loginhandler} />}
              </Redirect>
            </Route>
            <Route path="/login">
              {!login && <MainForm onLogin={loginhandler} />}
            </Route>

            <Route path="/homepage">
              <HomePage />
            </Route>

            <Route path="/myteam">
              <MyTeam />
            </Route>

            <Route path="/createContest">
              <CreateContest />
            </Route>

            <Route path="/createTeam">
              <Team />
            </Route>

            <Route path="/viewTeam">
              <ViewTeam />
            </Route>
            <Route path="/join/:id">
              <JoinContest />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
