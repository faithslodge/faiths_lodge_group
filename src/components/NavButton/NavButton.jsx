import { Button } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// orange: rgba(217, 144, 33, 1)
// green: rgba(92, 118, 55, 1)

const NavButton = ({ text, path, icon, sxStyle}) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(path);
  };

  return (
    <Button
      variant="contained"
      size="large"
      onClick={handleClick}
      sx={sxStyle}
      startIcon={icon}
    >
      {text}
    </Button>
  );
};

export default NavButton;