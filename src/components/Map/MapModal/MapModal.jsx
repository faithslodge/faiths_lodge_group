import * as React from 'react';
import {
  Modal,
  Typography,
  Box,
  Grid,
  Button,
  Link,
  Stack
} from '@mui/material';
import VerifiedIcon from "@mui/icons-material/Verified";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Email, Phone } from '@mui/icons-material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid black',
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
      >
        <Box borderRadius={5} sx={style}>
        {/* Modal Info Container */}
        <Grid container>

          {/* Left Side */}
          <Grid item xs={6} pr={1}>

            {/* Org Name, Verified Badge, View/Edit Btn */}
            <Typography variant="h5" component="h2">
              {org.name} {org.verified_by && <VerifiedIcon fontSize='small' />}
            </Typography>

            <br />

            {/* Org Info */}
            <Typography variant="body2">
              <Typography variant='overline' sx={overlineFont}><b>Organization Info</b></Typography><br />
              <b>Mission:</b> {org.mission}<br />
              <b>Address: </b>
                {org.address_line_1 && `${org.address_line_1}, `}
                {org.address_line_2 && `${org.address_line_2}, `}
                {org.city && `${org.city}, `}{org.state && `${org.state} `}
                {org.zip && `${org.phone}`}<br />
              <b>Phone:</b> {org.phone}<br />
              <b>Email:</b> {org.email}<br />
              <b>Website:</b> {org.url}<br />
              <b>Has Retreat?:</b> {boolCheck(org.has_retreat_center)}<br />
              <b>Faith Based?:</b> {boolCheck(org.faith_based)}<br />
              <b>For Profit?:</b> {boolCheck(org.for_profit)}<br />


              <br />

              {/* Notes */}
              <Typography variant='overline' sx={overlineFont}><b>Notes</b></Typography><br />
              <Typography variant="body2">
                {org.notes}<br />
              </Typography>

              <br />
            </Typography>
          </Grid>

          {/* Right Side */}
          <Grid item xs={6} pl={1}>
            
            {/* Edit Button */}
            <Typography align='right' pr={5}>
              <Button variant='text' sx={{fontSize: 'small'}}>View/Edit</Button>
            </Typography>

            <br />

            {/* Type of Loss */}
            <Typography variant='overline' sx={overlineFont}><b>Type of Loss</b></Typography>
              <Typography variant="body2" component="ul" pl={2}>
                <li>{org.agg_loss_type}</li>
              </Typography>

            <br />

            {/* Service Types */}
            <Typography variant='overline' sx={overlineFont}><b>Services</b></Typography>
              <Typography variant="body2" component="ul" pl={2}>
                <li>{org.agg_service_type}</li>
              </Typography>

            <br />

            {/* Point of Contact */}
            <Typography variant='overline' sx={overlineFont}><b>POINTS OF CONTACT</b></Typography><br />
              <Typography variant="body2" textTransform='capitalize' fontWeight='bold' fontSize={13}>contact name</Typography>
              <Typography variant="caption" fontWeight='300'>title</Typography>
              <Stack direction="row" alignItems="center" gap={1}>
                <Phone fontSize='xsmall' /> 
                <Typography variant="body2" fontSize={12}>(123) 456-7890</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <Email fontSize='xsmall' />
                <Link variant="body2" fontSize={12}>example@example.com</Link>
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