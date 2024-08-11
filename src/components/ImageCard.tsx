import { memo, MouseEventHandler } from "react";
import { PhotoWithOwnerandSizes } from "../typings/flickr";
import "./ImageCard.css";
import { fetchOriginalSize } from "../services/flickrService";

interface Props {
  image: PhotoWithOwnerandSizes;
  toggleFavourite: () => void;
  updateImage: (updatedImage: PhotoWithOwnerandSizes) => void;
  onShowModal: (image: PhotoWithOwnerandSizes) => void;
}

function ImageCard({
  image,
  toggleFavourite,
  updateImage,
  onShowModal,
}: Props) {
  const fallbackImageUrl = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;

  const handleImageClick = async () => {
    let updatedImage = image;
    if (!image.originalImgUrl) {
      const originalPhoto = await fetchOriginalSize(image.id);
      if (originalPhoto) {
        updatedImage = {
          ...image,
          originalImgUrl: originalPhoto.source,
        };
        updateImage(updatedImage); // Update the image with the original URL
      }
    }
    onShowModal(updatedImage); // Show modal with the possibly updated image
  };

  return (
    <div className="image-card" onClick={handleImageClick}>
      <img
        className="image-card__image"
        src={image.smallImgUrl ? image.smallImgUrl : fallbackImageUrl}
        alt={image.title}
      />

      <div className="image-card__overlay">
        <div className="image-card__overlayDetails">
          <h2>{image.title}</h2>
          <hr />
          <p>{image.ownerName}</p>
        </div>

        <button
          onClick={toggleFavourite}
          className={`image-card__button ${
            image.isFavourite
              ? "image-card__button--favourite"
              : "image-card__button--notFavourite"
          }`}
        >
          {image.isFavourite ? "Unfavourite" : "Favourite"}
        </button>
      </div>
    </div>
  );
}
export default memo(ImageCard);
