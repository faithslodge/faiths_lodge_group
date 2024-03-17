import * as React from "react";
import {
  Modal,
  Typography,
  Box,
  Grid,
  Button,
  Stack,
  Link,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Email, OpenInNew, Phone } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 800,
  maxHeight: "85%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto"
};

const overlineFont = {
  fontSize: 14,
  color: "rgba(92, 118, 55, 1)",
};

const boolCheck = (info) => {
  if (info === null) {
    return "";
  } else if (info === true) {
    return "Yes";
  } else if (info === false) {
    return "No";
  }
};

const MapModal = ({ open, handleClose, org }) => {
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

  const history = useHistory();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
      >
        <Box border="1px solid black" borderRadius={5} sx={style}>
          {/* Modal Info Container */}
          <Grid container>
            {/* Top: Name, Verified, Social Media, View/Edit Button */}
            <Grid container>
              <Grid item xs={6}>
                {/* Org Name, Verified Badge, View/Edit Btn */}
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography variant="h5" component="h2">
                    {org.name}
                  </Typography>

                  {org.date_verified && (
                    <Stack
                      spacing={1}
                      direction="row"
                      alignItems="center"
                      ml={1}
                    >
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

              {/* Social Meida, Edit Button */}
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
                    onClick={() => history.push(`/org/${org.id}`)}
                    variant="outlined"
                    sx={{ fontSize: "small" }}
                  >
                    View/Edit
                  </Button>
                </Stack>
              </Grid>
            </Grid>

            {/* Org Info */}
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

                {/* Notes */}
                <Typography variant="overline" sx={overlineFont}>
                  <b>Service Explanation</b>
                </Typography>
                <br />
                <Typography variant="body2">
                  {org.service_explanation}
                </Typography>
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

                {/* Stack to place Type of Loss and Services side-by-side */}
                <Stack direction="row" alignItems="top" gap={5}>
                  {/* Type of Loss */}
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
                <Grid container>
                  {/* Map Contacts */}
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
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          pl={1.5}
                        >
                          <Phone fontSize="xsmall" />
                          <Typography variant="body2" fontSize={12}>
                            {contact.phone}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          pl={1.5}
                        >
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
        </Box>
      </Modal>
    </div>
  );
};

export default MapModal;