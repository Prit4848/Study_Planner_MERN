import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes } from "react-router-dom";
import UserContext from "./Context/UserContext.jsx";
import PlanContext from "./Context/planContext.jsx";

createRoot(document.getElementById("root")).render(

    <UserContext>
     <PlanContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
     </PlanContext>
    </UserContext>
);
