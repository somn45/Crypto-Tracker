import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coins from './Coins';
import Coin from './Coin';

function Router() {
  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/:coinId" component={Coin}></Route>
          <Route path="/" component={Coins}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
