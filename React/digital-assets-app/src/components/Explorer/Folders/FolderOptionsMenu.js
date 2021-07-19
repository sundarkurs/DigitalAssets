import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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
      <MenuItem onClick={onRename}>Rename</MenuItem>
      <MenuItem onClick={onDelete}>Delete</MenuItem>
    </Menu>
  );
};

export default FolderOptionsMenu;
