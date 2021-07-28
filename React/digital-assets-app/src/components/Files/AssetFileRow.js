import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const AssetFileRow = (props) => {
  const classes = useStyles();

  const { files } = props;

  const handleToggle = (value) => () => {};

  return (
    <List dense className={classes.root}>
      {files.map((file) => {
        const labelId = `checkbox-list-secondary-label-${file.id}`;
        return (
          <ListItem key={file.id} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${file.id + 1}`}
                src={`/static/images/avatar/${file.id + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={`${file.name}`} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(file.id)}
                // checked={checked.indexOf(value) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default AssetFileRow;
