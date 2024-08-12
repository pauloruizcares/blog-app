
import { Route, Routes } from "react-router-dom";
import { routes } from "./Routes";


export const RouterContainer = () => {
  

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Routes>
  )
}
