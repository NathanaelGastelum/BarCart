import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import FilterListIcon from '@mui/icons-material/FilterList';
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filters = [
    {id: 'name', title: 'Name', type: 'string'},
    {id: 'spirit', title: 'Spirit', type: 'choice', choices: ['Whisk(e)y', 'Gin', 'Rum', 'Brandy']},
    {id: 'color', title: 'Color', type: 'choice', choices: ['blue', 'orange']},
    {id: 'height', title: 'Height', type: 'choice', choices: ['tiny', 'small', 'big', 'huge']},
    {id: 'width', title: 'Width', type: 'choice', choices: ['tiny', 'small', 'big', 'huge']},
  ]
  
  const filterComponents = {
    string: ({filter, onChange, value}) => <input value={value || ''} onInput={(e) => onChange(filter.id, e.target.value)} />,
    choice: ({filter, onChange, value}) => (
      <select value={value || ''} onInput={(e) => onChange(filter.id, e.target.value)} size={1 + filter.choices.length}>
        <option value="">(none)</option>
        {filter.choices.map((c) => <option value={c} key={c}>{c}</option>)}
       </select>
     ),
  };

  function handleChange(filterId, value) {
    props.onFilterChange(filterId, value);
  }

  const renderFilter = (f) => {
    const Component = filterComponents[f.type];
    return (
      <div key={f.id}>
        <b>{f.title}</b>
        <Component filter={f} value={props.filters[f.id]} onChange={handleChange} />
      </div>
    );
  };

  const drawer = (
    <div>
      <Toolbar />
        <Divider />
        <List>
          {filters.map(f => renderFilter(f))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        {JSON.stringify(props.filters)}
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
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
                width: drawerWidth
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
                width: drawerWidth
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
