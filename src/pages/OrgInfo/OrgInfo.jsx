import * as React from "react";
import {
  Typography,
  Grid,
  Button,
  Stack,
  Link,
  Container,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Email, Phone } from "@mui/icons-material";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Font Styling
const overlineFont = {
  fontSize: 14,
  color: "rgba(92, 118, 55, 1)",
};

// for rendering boolean values as "Yes/No"
const boolCheck = (info) => {
  if (info === null) {
    return "";
  } else if (info === true) {
    return "Yes";
  } else if (info === false) {
    return "No";
  }
};

const OrgInfo = () => {
  // hooks
  const { id } = useParams();
  const history = useHistory();
  // fetching Organizations from store
  const orgStore = useSelector((store) => store.organizations);
  // filter orgStore to get specific organization by ID
  const filteredOrgArray = orgStore?.filter((item) => item.id === Number(id));
  const org = filteredOrgArray[0];

  // Props for .mapping social media links/icons
  const socialMediaArray = [
    {
      url: org?.facebook_url,
      icon: FacebookIcon,
      props: { color: "rgba(8, 102, 255, 1)" },
    },
    {
      url: org?.instagram_url,
      icon: InstagramIcon,
      props: { color: "rgba(255, 0, 106, 1)" },
    },
    {
      url: org?.linked_in_url,
      icon: LinkedInIcon,
      props: { color: "rgba(10, 102, 194, 1)" },
    },
  ];

  return (
    <Container>
      {/* Main Grid Container, includes 3 nested Grid Containers for Top, Middle, Bottom sections */}
      <Grid container pt={5}>
        {/* TOP: Name, Verified, Social Media, Edit Button */}
        <Grid container>
          <Grid item xs={6}>
            {/* Org Name, Verified Badge, View/Edit Btn */}
            <Stack direction="row" alignItems="center" gap={2}>
              <Typography variant="h5" component="h3">
                {org.name}
              </Typography>

              {org.date_verified && (
                <Stack spacing={1} direction="row" alignItems="center" ml={1}>
                  <Typography
                    variant="caption"
                    fontStyle="italic"
                    sx={{ fontSize: 14, color: "rgba(217, 144, 33, 1)" }}
                  >
                    Verified
                  </Typography>
                  <VerifiedIcon
                    fontSize="medium"
                    sx={{ color: "rgba(217, 144, 33, 1)" }}
                  />
                </Stack>
              )}
            </Stack>
          </Grid>

          {/* Social Media, Edit Button */}
          <Grid item xs={6} pl={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" gap={1}>
                {socialMediaArray.map(
                  (site, i) =>
                    site.url && (
                      <Link
                        href={site.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        key={i}
                      >
                        <site.icon fontSize="medium" sx={site.props} />
                      </Link>
                    )
                )}
              </Stack>

              <Button
                onClick={() => history.push(`/orgedit/${org?.id}`)}
                variant="outlined"
                sx={{ fontSize: "small" }}
              >
                Edit
              </Button>
            </Stack>
          </Grid>
        </Grid>

        {/* MIDDLE: Org Details, Includes Left/Right side Grid Items */}
        <Grid container pt={3}>
          {/* Left Side */}
          <Grid item xs={6} pr={2}>
            <Typography variant="overline" sx={overlineFont}>
              <b>Organization Details</b>
            </Typography>
            <br />
            <Typography variant="body2">
              <b>Mission:</b> {org.mission}
              <br />
              <br />
              <b>Address: </b>
              {org.address_line_1 && `${org.address_line_1}, `}
              {org.address_line_2 && `${org.address_line_2}, `}
              {org.city && `${org.city}, `}
              {org.state && `${org.state} `}
              {org.zip && `${org.phone}`}
              <br />
              <b>Phone:</b> {org.phone}
              <br />
            </Typography>

            {/* Email */}
            <Stack direction="row" alignItems="top" gap={1}>
              <Typography variant="body2" fontWeight="bold">
                Email:{" "}
              </Typography>
              <Link
                variant="body2"
                href={`mailto:${org.email}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {org.email}
              </Link>
            </Stack>

            {/* Website */}
            <Stack direction="row" alignItems="top" gap={1}>
              <Typography variant="body2" fontWeight="bold">
                Website:
              </Typography>
              <Link
                variant="body2"
                href={org.url}
                target="_blank"
                rel="noreferrer noopener"
                noWrap
              >
                {org.url}
              </Link>
            </Stack>

            {/* Retreat?, Faith Based?, For Profit? */}
            <Typography variant="body2">
              <b>Has Retreat?:</b> {boolCheck(org.has_retreat_center)}
              <br />
              <b>Faith Based?:</b> {boolCheck(org.faith_based)}
              <br />
              <b>For Profit?:</b> {boolCheck(org.for_profit)}
              <br />
            </Typography>

            <br />

            {/* Service Explanation */}
            <Typography variant="overline" sx={overlineFont}>
              <b>Service Explanation</b>
            </Typography>
            <br />
            <Typography variant="body2">{org.service_explanation}</Typography>
          </Grid>

          {/* Right Side */}
          <Grid item xs={6} pl={2}>
            {/* Notes */}
            <Typography variant="overline" sx={overlineFont}>
              <b>Notes</b>
            </Typography>
            <br />
            <Typography variant="body2">{org.notes}</Typography>

            <br />

            {/* Stack to place Loss Types and Services side-by-side */}
            <Stack direction="row" alignItems="top" gap={5}>
              {/* Loss Types */}
              <div>
                <Typography variant="overline" sx={overlineFont}>
                  <b>Type of Loss</b>
                </Typography>
                <Typography variant="body2" component="ul" pl={2}>
                  {org.agg_loss_type &&
                    org.agg_loss_type?.map((losstype) => (
                      <li key={losstype.id}>{losstype.name}</li>
                    ))}
                </Typography>
              </div>

              {/* Service Types */}
              <div>
                <Typography variant="overline" sx={overlineFont}>
                  <b>Services</b>
                </Typography>
                <Typography variant="body2" component="ul" pl={2}>
                  {org.agg_service_type &&
                    org.agg_service_type?.map((service) => (
                      <li key={service.id}>{service.name}</li>
                    ))}
                </Typography>
              </div>
            </Stack>
          </Grid>

          <Grid item xs={12} pt={3}>
            {/* Point of Contact */}
            <Typography variant="overline" sx={overlineFont}>
              <b>POINTS OF CONTACT</b>
            </Typography>

            <br />

            {/* BOTTOM: Map Contacts */}
            <Grid container>
              {org.agg_contacts &&
                org.agg_contacts?.map((contact) => (
                  <Grid item key={contact.id} xs={3} overflow="hidden" pr={2}>
                    <Typography
                      variant="body2"
                      textTransform="capitalize"
                      fontWeight="bold"
                      fontSize={13}
                    >
                      {contact.firstName} {contact.lastName}
                    </Typography>
                    <Typography variant="caption" fontWeight="300" pl={1.5}>
                      Title: {contact.title}
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={1} pl={1.5}>
                      <Phone fontSize="xsmall" />
                      <Typography variant="body2" fontSize={12}>
                        {contact.phone}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1} pl={1.5}>
                      <Email fontSize="xsmall" />
                      <Link
                        variant="body2"
                        href={`mailto:${contact.email}`}
                        fontSize={12}
                        target="_blank"
                        rel="noreferrer noopener"
                        noWrap
                      >
                        {contact.email}
                      </Link>
                    </Stack>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrgInfo;
