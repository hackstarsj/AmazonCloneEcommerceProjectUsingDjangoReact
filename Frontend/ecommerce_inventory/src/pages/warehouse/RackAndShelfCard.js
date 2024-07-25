import React from 'react';
import { Card, CardContent, Typography, Grid, Divider, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { EditOutlined } from '@mui/icons-material';

const StyledCard = styled(Card)({
  minWidth: 275,
  margin: '1rem',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const TitleTypography = styled(Typography)({
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: '0.5rem',
});

const DetailTypography = styled(Typography)({
  fontSize: 14,
  marginBottom: '0.5rem',
});

const RackAndShelfCard = ({ item,onEditClick }) => {
  return (
    <StyledCard>
      <CardContent>
        <Box display={"flex"} justifyContent={"space-between"}>
        <TitleTypography color="textPrimary" gutterBottom>
          Item Details
        </TitleTypography>
        <IconButton onClick={()=>onEditClick(item.id)}><EditOutlined color='primary'/></IconButton>
        </Box>
        <Divider sx={{mb:2}}/>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DetailTypography color="textSecondary">
              <b>ID:</b> {item.id}
            </DetailTypography>
            <DetailTypography color="textSecondary">
              <b>Rack:</b> {item.rack}
            </DetailTypography>
            <DetailTypography color="textSecondary">
              <b>Shelf:</b> {item.shelf}
            </DetailTypography>
            <DetailTypography color="textSecondary">
              <b>Floor:</b> {item.floor}
            </DetailTypography>
            <DetailTypography color="textSecondary">
            <b>Added By:</b> {item.added_by_user_id}
            </DetailTypography>
            <DetailTypography color="textSecondary">
            <b>Domain User ID:</b> {item.domain_user_id}
            </DetailTypography>
            <DetailTypography color="textSecondary">
            <b>Warehouse ID: </b>{item.warehouse_id}
            </DetailTypography>
            <DetailTypography color="textSecondary">
            <b>Created At:</b> {item.created_at}
            </DetailTypography>
            <DetailTypography color="textSecondary">
            <b> Updated At:</b> {item.updated_at}
            </DetailTypography>
            {/* Render additional details if available */}
            <Box component={"fieldset"} borderColor="grey.500" padding={1} border={1} borderRadius={2}>
                <Box component={"legend"} variant="h6" gutterBottom>Additional Details</Box>
            {item.additional_details.map((detail, index) => (
              <DetailTypography key={index} color="textSecondary">
                <b>{detail.key}:</b> {detail.value}
              </DetailTypography>
            ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default RackAndShelfCard;
