import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Fisca } from "./components/Fisca";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/fisca',
    element: <Fisca />
  }
];

export default AppRoutes;
