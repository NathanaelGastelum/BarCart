import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from '@mui/icons-material/FilterList';
import Toolbar from "@mui/material/Toolbar";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';

import ChipsArray from "./chipsArray";

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function Tags() {
    const [selectedOptions, setSelectedOptions] = React.useState([]);

    const handleChange = (event, value) => {
      setSelectedOptions(value);
    };

    const handleUpdate = () => {
      props.onFilterChange(props.filters?.concat(selectedOptions));
    };

    const handleDelete = () => {
      props.onFilterChange([]);
    };

    return (
      <Stack m={1}>
        <Autocomplete
          multiple
          id="tags-filled"
          options={[]}
          defaultValue={[]}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Inventory"
              placeholder="Ingredients"
            />
          )}
          onChange={handleChange}
        />
        <Button onClick={handleUpdate}>Update Ingredients</Button>
        <Button onClick={handleDelete}>Clear Ingredients</Button>
        <ChipsArray
          chipData={props.filters}
        />
      </Stack>
    );
  }

  const drawer = (
    <div>
      <Toolbar />
      <Tags />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
        >
            <FilterListIcon />
        </IconButton>
        <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
            component="nav"
            sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="filter checkboxes"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            anchor="right"
            ModalProps={{
                keepMounted: true // Better open performance on mobile.
            }}
            sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: props.drawerWidth
                }
            }}
            >
            {drawer}
            </Drawer>
            <Drawer
            variant="permanent"
            anchor="right"
            sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: props.drawerWidth
                }
            }}
            open
            >
            {drawer}
            </Drawer>
        </Box>
        </Box>
    </div>
  );
}

export default ResponsiveDrawer;
