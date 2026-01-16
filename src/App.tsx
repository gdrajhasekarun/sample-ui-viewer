import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import CustomRoutes from "./routes/Routes";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function App() {
  return (
    <>
      <Router>
        <Typography
          variant="h4"
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "2%",
          }}
        >
          Platform Automation
        </Typography>
        <CustomRoutes />
      </Router>
    </>
  );
}

export default App;
