import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";

const Notification = () => {
  return (
    <React.Fragment>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography>Notification</Typography>
      </Box>
      <Divider />
    </React.Fragment>
  );
};

export default Notification;
