import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Fisca } from "./components/Fisca";
import { FiscaOcr } from "./components/FiscaOcr";
import { Home } from "./components/Home";
import { PruebaDash } from "./components/PruebaDash";

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
  },
  {
    path: '/fiscaocr',
    element: <FiscaOcr />
  },
  {
    path: '/pruebadash',
    element: <PruebaDash />
  }
];

export default AppRoutes;
