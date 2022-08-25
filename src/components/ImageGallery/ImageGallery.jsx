import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ data }) => {
  //   console.dir(ImageGallery);
  return <Gallery>{data.map(image => ImageGalleryItem(image))}</Gallery>;
};

ImageGallery.propTypes = {
  data: PropTypes.array.isRequired,
};
