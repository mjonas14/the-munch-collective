import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import image from "../utils/assets/images/Home_Image.png";

const RecipeCard = ({name, comment, id }) => {
    return (
    <Card sx={{ width: 300, height: 320, margin: "10px" }}>
               <CardActionArea
                component={Link}
                to={`/recipe/${id}`}
                sx={{ height: 270 }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={image}
                  alt={name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {name}
                   </Typography>
                   <Typography variant="body2" color="text.secondary">
                     {comment.length > 120
                     ?
                     comment.substring(0, 120) + "..."
                    :
                    comment}
                   </Typography>
                 </CardContent>
               </CardActionArea>
               <CardActions>
                 <Button
                  size="small"
                  color="primary"
                  style={{ display: "flex", justfiyContent: "center" }}
                >
                  Share
                </Button>
              </CardActions>
            </Card>
    );
};

export default RecipeCard;
