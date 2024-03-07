import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import VerifiedIcon from "@mui/icons-material/Verified";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useState } from "react";
import { Fade } from '@mui/material';

import MapModal from "./MapModal/MapModal";
import { useRef } from "react";

function OrganizationCard({
  name,
  verified_by,
  mission,
  logo,
  city,
  state,
  phone,
  url,
  org
}) {

  // Modal Open/Close state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const ref = useRef(null)

  
  // Used MUI Joy Map Template. Left default styling options.
  // Will refactor for readability at a later time
  // ! Data is passed as props into CardContent (scroll down to CardContent)
  return (
    // Main Card
    <>

    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        bgcolor: "neutral.softBg",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        "&:hover": {
          boxShadow: "lg",
          borderColor: "var(--joy-palette-neutral-outlinedDisabledBorder)",
        },
      }}
    >
      {/* Content Overflow Handling */}
      <CardOverflow
        sx={{
          mr: { xs: "var(--CardOverflow-offset)", sm: 0 },
          mb: { xs: 0, sm: "var(--CardOverflow-offset)" },
          "--AspectRatio-radius": {
            xs: "calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0",
            sm: "calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))",
          },
        }}
      >
        {/* AspectRatio for setting Img Size/Ratio */}
        {/* need to fix for small screens */}
        <AspectRatio
          ratio="1"
          flex
          sx={{
            minWidth: { sm: 100 },
          }}
        >
          <img alt="" src={logo} />
        </AspectRatio>
      </CardOverflow>

      {/* !!! MAIN Card Content !!! */}
      <CardContent>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <div>
            <Typography level="title-md" >
              <Link
                overlay
                onClick={handleOpen}
                underline="none"
                gap={1}
                sx={{ color: "text.primary" }}
              >
                {name}
                {verified_by && <VerifiedIcon fontSize='small' sx={{color: 'rgba(217, 144, 33, 1)'}} />}
              </Link>
            </Typography>
          </div>
        </Stack>
        <Stack
          spacing="0.25rem 1rem"
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{ my: 0.25 }}
        >
          <Typography level="body-xs" startDecorator={<LocationOnIcon fontSize="small" />}>
            {city}, {state}
          </Typography>

          <Typography level="body-xs" startDecorator={<PhoneIcon fontSize="small" />}>
            {phone}
          </Typography>

          {/* if website provided, render link */}
          {url && (
            <Link
              level="body-xs"
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              startDecorator={<OpenInNewIcon fontSize="small"/>}
            >
              Website
            </Link>
          )}
        </Stack>
        <Stack direction="row">
          <Typography level="title-sm" sx={{ display: "flex", gap: 1, overflow: "hidden", textOverflow: 'ellipsis'}}>
            {mission}
          </Typography>
        </Stack>
      </CardContent>
    </Card>

    <MapModal org={org} open={open} handleClose={handleClose} />
    </>
  );
}


export default OrganizationCard