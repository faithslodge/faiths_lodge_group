import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";

const columns = [
  {
    field: "verified_by",
    headerName: "Verify",
    flex: 1,
    headerClassName: "column-header",
    sortable: false,
    renderCell: (params) => {
      return +params.row.verified_by === 1 ? (
        <Stack spacing={0.2} direction="row" alignItems="center" ml={1}>
          <Typography
            variant="caption"
            fontStyle="italic"
            sx={{ fontSize: 13, color: "rgba(217, 144, 33, 1)" }}
          >
            Verified
          </Typography>
          <VerifiedIcon
            fontSize="small"
            sx={{ color: "rgba(217, 144, 33, 1)" }}
          />
        </Stack>
      ) : (
        ""
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    headerClassName: "column-header",
    sortable: false,
  },


  {
    field: "state",
    headerName: "State",
    flex: 1,
    headerClassName: "column-header",
    sortable: false,
  },

  {
    field: "city",
    headerName: "City",
    flex: 1,
    headerClassName: "column-header",
    sortable: false,
  },

  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
    headerClassName: "column-header",
    sortable: false,
  },

];

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