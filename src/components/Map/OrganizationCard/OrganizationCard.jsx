import * as React from "react";
import Card from "@mui/joy/Card";
import { useState } from "react";

import CardContentComponent from "./CardContentComp";
import CardOverflowComp from "./CardOverflowComp";
import { AspectRatio, CardOverflow } from "@mui/joy";

function OrganizationCard({ logo, org }) {
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

        {/* 
          Content Overflow Handling 
          Tried Moving to a separate component but image rendered incorrectly
        */}

        {/* <CardOverflowComp logo={logo} /> */}
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
            objectFit="cover"
            sx={{
              minWidth: { sm: 100 },
            }}
          >
            <img alt="logo" src={logo} />
          </AspectRatio>
        </CardOverflow>


        {/* !!! MAIN Card Content !!! */}
        <CardContentComponent org={org} />

        
      </Card>
    </>
  );
}

export default OrganizationCard;
