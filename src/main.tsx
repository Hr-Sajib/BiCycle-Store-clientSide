import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom"; // Import BrowserRouter
import {Toaster} from "sonner"
import "./index.css";
import { store } from "./redux/store.ts";
import router from "./routes/routes.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster/>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider> 
  </StrictMode>
);