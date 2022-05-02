import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        View Recipe
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Glassware: {props.glass}<br/>
            {props.category ? `Category: ${props.category}` : ""}<br/>
          </DialogContentText>
            <List>
                {props.ingredients.map((ingredient, index) => 
                    <ListItem key={index}>
                      <ListItemText
                          primary={ingredient.special ? ingredient.special : `${ingredient.amount} ${ingredient.unit} ${ingredient.ingredient}`}
                      />
                    </ListItem>
                )}
            </List>
            <DialogContentText>
              {props.preparation}<br/>
              {props.garnish ? `Garnish with ${props.garnish}` : ""} {/*TODO: figure out how to add line break here*/}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
