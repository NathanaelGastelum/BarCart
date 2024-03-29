import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';

import RecipeDialog from "./recipeDialog";
import RecipeFilter from "./recipeFilter";

const drawerWidth = 240;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'glass',
    numeric: false,
    disablePadding: false,
    label: 'Glass',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="secondary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  const handleFilterChange = (value) => {
    props.onFilterChange(value);
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Recipes
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        // <Tooltip> FIXME: needs "Filter list" title, but wouldn't go away while drawer was opened
          <IconButton>
            <RecipeFilter 
              filters={props.filters}
              onFilterChange={handleFilterChange}
              drawerWidth={drawerWidth}
            /> {/* TODO: sort out the error cause by nested buttons */}
          </IconButton>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState([]);

  // This method fetches the recipes from the database.
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(`http://localhost:5000/api/recipes/`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const recipes = await response.json();
        // TODO: potentially optimize by changeing to sets?
        filters?.length > 0 ?
        // TODO: change this to not be case sensitive
        setRecipes(recipes?.filter(recipe => recipe.ingredients?.every(ingredient => filters.includes(ingredient.ingredient)))) :
        setRecipes(recipes);
    }

    getRecipes();
    
    return;
  }, [recipes.length, filters]);

  useEffect(()=>{
    setFilters(JSON.parse(localStorage.getItem('filters')));
  },[]);

  useEffect(()=>{
    localStorage.setItem('filters', JSON.stringify(filters));
  },[filters]);

  const handleFilterChange = (value) => {
    setFilters(value);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
      if (event.target.checked) {
      const newSelecteds = recipes.map((n) => n.name);
      setSelected(newSelecteds);
      return;
      }
      setSelected([]);
  };

  const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];

      if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
      );
      }

      setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - recipes.length) : 0;

  return (
      <Box component="main"
        sx={{ flexGrow: 0, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
      <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar 
            numSelected={selected.length}
            filters={filters}
            onFilterChange={handleFilterChange}
             />
          <TableContainer>
          <Table
              sx={{ minWidth: 300 }}
              aria-labelledby="tableTitle"
              size='medium'
          >
              <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={recipes.length}
              />
              <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                  rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(recipes, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((recipe, index) => {
                  const isItemSelected = isSelected(recipe.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                      <TableRow
                      hover
                      onClick={(event) => handleClick(event, recipe.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={recipe.name}
                      selected={isItemSelected}
                      >
                      <TableCell padding="checkbox">
                          <Checkbox
                          color="secondary"
                          checked={isItemSelected}
                          inputProps={{
                              'aria-labelledby': labelId,
                          }}
                          />
                      </TableCell>
                      <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                      >
                          {recipe.name}
                      </TableCell>
                      <TableCell align="left">{recipe.glass}</TableCell>
                      <TableCell align="left">{recipe.category}</TableCell>
                      <TableCell>
                          <RecipeDialog
                            name={recipe.name}
                            glass={recipe.glass}
                            category={recipe.category}
                            ingredients={recipe.ingredients}
                            garnish={recipe.garnish}
                            preparation={recipe.preparation}
                          />
                      </TableCell>
                      </TableRow>
                  );
                  })}
              {emptyRows > 0 && (
                  <TableRow
                  style={{
                      height: 53 * emptyRows,
                  }}
                  >
                  <TableCell colSpan={6} />
                  </TableRow>
              )}
              </TableBody>
          </Table>
          </TableContainer>
          {/* TODO: change to infinite scroll with react-window */}
          <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={recipes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Paper>
      </Box>
  );
}