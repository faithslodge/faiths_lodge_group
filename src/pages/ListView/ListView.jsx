import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const columns = [
  {
    field: "verified_by",
    headerName: "Verify",
  },
  {
    field: "name",
    headerName: "Name",
  },

  {
    field: "state",
    headerName: "State",
  },

  {
    field: "phone",
    headerName: "Phone",
  },
];

//agg_loss_type

const ListView = () => {
  const organizations = useSelector((store) => store.organizations);
  console.log(organizations);
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={organizations}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ListView;
