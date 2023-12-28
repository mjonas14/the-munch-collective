import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function PotluckBar({ img, title, id }) {
  return (
    <div>
      <Card
        sx={{
          height: 65,
          margin: "20px 20px 0px 20px",
          backgroundColor: "#EBECF0",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="Potluck picture"
            src={img}
            sx={{ width: 45, height: 45 }}
          >
            <Typography sx={{ fontSize: "20px" }}>
              {title.charAt(0)}
            </Typography>
          </Avatar>
          <Typography variant="h5" sx={{ marginLeft: "30px" }}>
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={`/mypotlucks/${id}`}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
