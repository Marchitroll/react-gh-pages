import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function ItemCard({ id, title, description, imageUrl }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="250"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '1.0rem', fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '1.0rem', color: 'black' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ color: 'black', fontSize: '0.55rem' }}
          aria-label={`Learn more about ${title}`}
          component={Link}
          to={`/detalle/${id}`}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

ItemCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

ItemCard.defaultProps = {
  onLearnMore: () => {},
};
