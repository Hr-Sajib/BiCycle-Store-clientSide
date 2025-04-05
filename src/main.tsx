import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom"; // Import BrowserRouter
import {Toaster} from "sonner"
import "./index.css";
import { store } from "./redux/store.ts";
import router from "./routes/routes.tsx";
import { PersistGate } from 'redux-persist/integration/react'
import {persistor} from "./redux/store.ts"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster/>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider> 
  </StrictMode>
);