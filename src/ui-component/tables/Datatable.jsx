import { Box, IconButton, Tooltip, styled } from "@mui/material";
import MUIDataTable from "mui-datatables";
import React from "react"; 
import AddIcon from "@mui/icons-material/Add";
import { capitalizeFirstLetter } from "utils/helper";
import MatxLoading from "ui-component/MatxLoading";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function Datatable({ title, data, columns, options, isLoading, addHandler }) {
  options = {
    ...options,
    viewColumns: false,
    rowHover: true,
    customToolbar: () => {
      return (
        <Tooltip title={`Add ${title}`}>
          <IconButton onClick={addHandler}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      );
    },
    selectableRowsHideCheckboxes: true,
    textLabels: {
      body: {
        noMatch: isLoading ? (
          <MatxLoading />
        ) : (
          "Sorry, there is no matching data to display"
        ),
      },
    },
  };
  return (
    <MUIDataTable
      title={capitalizeFirstLetter(title) + " List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default Datatable;