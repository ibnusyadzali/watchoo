import { RouterProvider } from "react-router-dom";
import router from './routers';
import store from "./stores/index"
import {Provider} from "react-redux"


function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  );
}

export default App;
