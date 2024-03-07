import * as React from 'react';
import {
  Modal,
  Typography,
  Box,
  Grid,
  Button,
  Stack,
  Link
} from '@mui/material';
import VerifiedIcon from "@mui/icons-material/Verified";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Email, OpenInNew, Phone } from '@mui/icons-material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

const overlineFont = {
  fontSize: 14, 
  color: 'rgba(92, 118, 55, 1)'
}

const boolCheck = (info) => {
  if(info === null){
    return ""
  } else if(info === true){
    return "Yes"
  } else if(info === false){
    return "No"
  }
}

const MapModal = ({ open, handleClose, org }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
      >
        <Box border='1px solid black' borderRadius={5} sx={style}>
        {/* Modal Info Container */}
        <Grid container>

          {/* Left Side */}
          <Grid item xs={6} pr={1}>

            {/* Org Name, Verified Badge, View/Edit Btn */}
            <Stack direction="row" alignItems="center" gap={2}>
              <Typography variant="h5" component="h2">
                {org.name}
              </Typography>
              
              {org.verified_by && (
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

            <br />

            {/* Org Info */}
            <Typography variant='overline' sx={overlineFont}><b>Organization Info</b></Typography><br />
              <Typography variant="body2">
                <b>Mission:</b> {org.mission}<br />
                <b>Address: </b>
                  {org.address_line_1 && `${org.address_line_1}, `}
                  {org.address_line_2 && `${org.address_line_2}, `}
                  {org.city && `${org.city}, `}{org.state && `${org.state} `}
                  {org.zip && `${org.phone}`}<br />
                <b>Phone:</b> {org.phone}<br />
              </Typography>

              {/* Email */}
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="body2" fontWeight='bold'>Email: </Typography>
                <Link variant="body2" href={`mailto:${org.email}`} target="_blank" rel="noreferrer noopener">{org.email}</Link>
              </Stack>

              {/* Website */}
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="body2" fontWeight='bold'>Website:</Typography>
                <Link variant="body2" href={org.url} target="_blank" rel="noreferrer noopener">{org.url}</Link>
              </Stack>

              {/* Retreat?, Faith Based?, For Profit? */}
              <Typography variant="body2">
                <b>Has Retreat?:</b> {boolCheck(org.has_retreat_center)}<br />
                <b>Faith Based?:</b> {boolCheck(org.faith_based)}<br />
                <b>For Profit?:</b> {boolCheck(org.for_profit)}<br />
              </Typography>

              <br />

              {/* Notes */}
              <Typography variant='overline' sx={overlineFont}><b>Notes</b></Typography><br />
                <Typography variant="body2">
                  {org.notes}<br />
                </Typography>
          </Grid>

          {/* Right Side */}
          <Grid item xs={6} pl={1}>
            
            {/* Edit Button */}
            <Typography align='right' pr={5}>
              <Button variant='text' sx={{fontSize: 'small'}}>View/Edit</Button>
            </Typography>
          
            <br />

            {/* Stack to place Type of Loss and Services side-by-side */}
            <Stack direction="row" alignItems="top" gap={5}>
              {/* Type of Loss */}
              <div>
                <Typography variant='overline' sx={overlineFont}><b>Type of Loss</b></Typography>
                  <Typography variant="body2" component="ul" pl={2}>
                    {org.agg_loss_type && org.agg_loss_type?.map((losstype)=>(<li key={losstype.id}>{losstype.name}</li>))}
                  </Typography>
              </div>

              {/* Service Types */}
              <div>
                <Typography variant='overline' sx={overlineFont}><b>Services</b></Typography>
                  <Typography variant="body2" component="ul" pl={2}>
                    {org.agg_service_type && org.agg_service_type?.map((service)=>(<li key={service.id}>{service.name}</li>))}
                  </Typography>
              </div>
            </Stack>
          
            <br /><br />

            {/* Point of Contact */}
            <Typography variant='overline' sx={overlineFont}><b>POINTS OF CONTACT</b></Typography><br />
              <Typography variant="body2" textTransform='capitalize' fontWeight='bold' fontSize={13}>contact name</Typography>
              <Typography variant="caption" fontWeight='300' pl={2}>title</Typography>
              <Stack direction="row" alignItems="center" gap={1} pl={2}>
                <Phone fontSize='xsmall' /> 
                <Typography variant="body2" fontSize={12}>(123) 456-7890</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1} pl={2}>
                <Email fontSize='xsmall' />
                <Link variant="body2" href={`mailto:example@example.com`}  fontSize={12} target="_blank" rel="noreferrer noopener">
                  example@example.com
                </Link>
              </Stack>
            
            <br />

            {/* Social Media */}
            <Typography variant='overline' sx={overlineFont}>
              <b>Social Media</b>
            </Typography>
            <br />
              <Stack direction="row" alignItems="center" gap={1}>
                {org.facebook_url &&
                  <Link 
                    href={org.facebook_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    >
                      <FacebookIcon fontSize='medium' />
                  </Link>
                }

                {org.instagram_url &&
                  <Link 
                    href={org.instagram_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    >
                      <InstagramIcon fontSize='medium' sx={{color: 'rgba(229, 71, 101, 1)'}} />
                  </Link>
                }

                {org.linked_in_url &&
                  <Link 
                    href={org.linked_in_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    >
                      <LinkedInIcon fontSize='medium' />
                  </Link>
                }
            </Stack>
          </Grid>
        </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default MapModal