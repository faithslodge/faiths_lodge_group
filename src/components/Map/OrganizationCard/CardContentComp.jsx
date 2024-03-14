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
import { Fade } from "@mui/material";
import MapModal from "../MapModal/MapModal";
import { useRef } from "react";

function CardContentComponent({ org }) {
  // Modal Open/Close state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <CardContent>
        {/* Org Name and Verified Icon */}

        <Link
          overlay
          onClick={handleOpen}
          underline="none"
          gap={1}
          sx={{ color: "text.primary" }}
        >
          <Stack spacing={1} direction="row" alignItems="center">
            <div>
              <Typography level="title-md">{org.name}</Typography>
            </div>

            <div>
              {org.date_verified && (
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
              )}
            </div>
          </Stack>
        </Link>

        {/* City, State, Phone, Website */}
        <Stack
          spacing="0.25rem 1rem"
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{ my: 0.25 }}
        >
          {/* City, State */}
          <Typography
            level="body-xs"
            startDecorator={<LocationOnIcon fontSize="small" />}
          >
            {org.city && `${org.city}, `}
            {org.state}
          </Typography>

          {/* conditionally render phone if provided */}
          {org.phone && (
            <Typography
              level="body-xs"
              startDecorator={<PhoneIcon fontSize="small" />}
            >
              {org.phone}
            </Typography>
          )}

          {/* conditionally render website if provided */}
          {org.url && (
            <Link
              level="body-xs"
              href={org.url}
              target="_blank"
              rel="noreferrer noopener"
              startDecorator={<OpenInNewIcon fontSize="small" />}
            >
              Website
            </Link>
          )}
        </Stack>

        {/* Mission */}
        <Stack direction="row">
          <Typography
            level="title-sm"
            sx={{
              maxHeight: 60,
              display: "flex",
              gap: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {org.mission}
          </Typography>
        </Stack>
      </CardContent>

      {/* Modal */}
      <MapModal org={org} open={open} handleClose={handleClose} />
    </>
  );
}

export default CardContentComponent;
