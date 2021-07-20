import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const FolderOptionsMenu = (props) => {
  const { element, onClose, onRename, onDelete } = props;

  return (
    <Menu
      id="simple-menu"
      anchorEl={element}
      keepMounted
      open={Boolean(element)}
      onClose={onClose}
    >
      <MenuItem onClick={onRename}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Rename" />
      </MenuItem>
      <MenuItem onClick={onDelete}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </MenuItem>
    </Menu>
  );
};

export default FolderOptionsMenu;
