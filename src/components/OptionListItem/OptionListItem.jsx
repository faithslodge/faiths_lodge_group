import { Button, ListItem, ListItemText } from "@mui/material"

const OptionListItem = ({text}) => {
    return (
        <ListItem  sx={{width: 250}}>
            <ListItemText primary={text} />
            <Button>📝 Edit</Button>
        </ListItem>
    )
}

export default OptionListItem;