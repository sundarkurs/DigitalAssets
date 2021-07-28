import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";

const AppImageFileList = (props) => {
  const { files } = props;
  return (
    <List>
      {files &&
        files.length > 0 &&
        files.map((file, index) => {
          return (
            <ListItem id={index}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={file.name}
                secondary={`Size: ${file.size}`}
              />
            </ListItem>
          );
        })}
    </List>
  );
};

export default AppImageFileList;
