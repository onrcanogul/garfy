import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddButtonProps {
  text: string;
  onClick: () => void;
}

const AddButton = (props: AddButtonProps) => {
  return (
    <Tooltip title={props.text} arrow>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={props.onClick}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default AddButton;
