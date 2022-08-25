import { PropTypes } from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';
import authContext from '../../service/context';

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags }) => {
  return (
    <GalleryItem key={id}>
      <authContext.Consumer>
        {hadleImageClick => (
          <Image
            src={webformatURL}
            alt={tags}
            onClick={hadleImageClick}
            data-largeurl={largeImageURL}
            data-alt={tags}
          />
        )}
      </authContext.Consumer>
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
