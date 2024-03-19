import * as React from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";

import OrganizationCard from "../../components/Map/OrganizationCard/OrganizationCard";
import Search from "../../components/Map/Filters/Search";
import Filters from "../../components/Map/Filters/Filters";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MapBox from "../../components/Map/MapBox/MapBox";

// TODO
// 1. .map(organizations) OrganizationCards with following props: name, verified, mission, logo, city, state, phone
// 2. add the following filters: verified, type of loss, services
// 3. verify all filters work

function MapView() {
  const storeOrgs = useSelector((store) => store?.organizations);
  const filteredOrgs =  useSelector(store => store?.filters);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: "SET_FILTER_ORGS", payload: storeOrgs})
  }, [storeOrgs]);


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
          <Search  />
        </Stack>

        {/* !--- insert map into this Box, replace background img ---! */}
        <Box
          sx={{
            gridRow: "span 3",
            display: { xs: "none", md: "flex" },
            backgroundColor: "background.level1",
            backgroundSize: "cover",
          }}
        >
          <MapBox />
        </Box>

        {/* Left Panel with Filters and Org Cards */}
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Filters />

          {/* Organization Cards */}
          <Stack spacing={2} sx={{ overflow: "auto" }}>
            {filteredOrgs.map((org) => (
              <OrganizationCard
                key={org.id}
                logo={org.file_path ? org.file_path : "/FaithsLogoPlaceholder.png"}
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
