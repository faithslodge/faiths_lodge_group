import * as React from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";

import OrganizationCard from "../../components/Map/OrganizationCard/OrganizationCard";
import Search from "../../components/Map/Filters/Search";
import Filters from "../../components/Map/Filters/Filters";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// TODO
// 1. .map(organizations) OrganizationCards with following props: name, verified, mission, logo, city, state, phone
// 2. add the following filters: verified, type of loss, services
// 3. verify all filters work

function MapView() {
  const storeOrgs = useSelector((store) => store.organizations);
  const [orgList, setOrgList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setOrgList(storeOrgs);
  }, [storeOrgs]);

  const filterOrgs = (filter) => {
    setOrgList(filter);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          height: "100vh", // 55px is the height of the NavBar
          display: "grid",
          gridTemplateColumns: { xs: "auto", md: "40% 60%" },
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        {/* Search Stack */}
        <Stack
          sx={{
            backgroundColor: "background.surface",
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Search search={search} setSearch={setSearch} />
        </Stack>

        {/* !--- insert map into this Box, replace background img ---! */}
        <Box
          sx={{
            gridRow: "span 3",
            display: { xs: "none", md: "flex" },
            backgroundColor: "background.level1",
            backgroundSize: "cover",
            backgroundImage:
              'url("https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3731&q=80")',
          }}
        />

        {/* Organization Cards */}
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Filters />
          <Stack spacing={2} sx={{ overflow: "auto" }}>
            {orgList
              ?.filter((org) => {
                return search.toLowerCase() === ""
                  ? org
                  : org.name.toLowerCase().includes(search);
              })
              .map((org) => (
                <OrganizationCard
                  key={org.id}
                  logo="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
                  org={org}
                />
              ))}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default MapView;
