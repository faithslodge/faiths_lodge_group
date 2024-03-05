import { Button, ListItem, ListItemText } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const OptionListItem = ({text}) => {
    return (
        <ListItem  sx={{width: "auto"}}>
            <ListItemText primary={text} />
            <Button><EditIcon /></Button>
        </ListItem>
    )
}

export default OptionListItem;