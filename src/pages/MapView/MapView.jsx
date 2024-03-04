import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';

import OrganizationCard from '../../components/Map/OrganizationCard';
import Search from '../../components/Map/Search';
import Filters from '../../components/Map/Filters';

function MapView() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      {/* Main Container */}
      <Box
        component="main"
        sx={{
          height: '100vh', // 55px is the height of the NavBar
          display: 'grid',
          gridTemplateColumns: { xs: 'auto', md: '40% 60%' },
          gridTemplateRows: 'auto 1fr auto',
        }}
      >

        {/* Search Stack */}
        <Stack
          sx={{
            backgroundColor: 'background.surface',
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Search />
        </Stack>


        {/* !--- insert map into this Box, replace background img ---! */}
        <Box
          sx={{
            gridRow: 'span 3',
            display: { xs: 'none', md: 'flex' },
            backgroundColor: 'background.level1',
            backgroundSize: 'cover',
            backgroundImage:
              'url("https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3731&q=80")',
          }}
        />

        {/* Organization Cards */}
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Filters />
          <Stack spacing={2} sx={{ overflow: 'auto' }}>

            {/* Map DB info as props */}
            <OrganizationCard
              name="Faiths Lodge"
              verified={true}
              cityState="Minneapolis, MN"
              phone="(123) 456-7890"
              mission="Lorem ipsum la zell uffda sieta homen latilda"
              image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
            />

          </Stack>
        </Stack>
      </Box>
    </CssVarsProvider>
  );
}

export default MapView;