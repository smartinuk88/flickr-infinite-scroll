import { memo, MouseEvent, MouseEventHandler } from "react";
import { PhotoWithOwnerandSizes } from "../typings/flickr";
import "./ImageCard.css";
import { fetchOriginalSize } from "../services/flickrService";

interface Props {
  image: PhotoWithOwnerandSizes;
  onToggleFavourite: (id: string) => void;
  updateImage: (updatedImage: PhotoWithOwnerandSizes) => void;
  onShowModal: (image: PhotoWithOwnerandSizes) => void;
}

function ImageCard({
  image,
  onToggleFavourite,
  updateImage,
  onShowModal,
}: Props) {
  const handleImageClick = async () => {
    let updatedImage = image;
    if (!image.originalImgUrl) {
      const originalPhoto = await fetchOriginalSize(image.id);
      if (originalPhoto) {
        updatedImage = {
          ...image,
          originalImgUrl: originalPhoto.source,
        };
        updateImage(updatedImage); // Update the image with the original (full size) URL
      }
    }
    onShowModal(updatedImage);
  };

  const handleToggleFavouriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleFavourite(image.id);
  };

  return (
    <div className="image-card" onClick={handleImageClick}>
      <img
        className="image-card__image"
        src={image.smallImgUrl}
        alt={image.title}
      />

      <div className="image-card__overlay">
        <div className="image-card__overlayDetails">
          <h2>{image.title}</h2>
          <hr />
          <p>{image.ownerName}</p>
        </div>

        <button
          onClick={handleToggleFavouriteClick}
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
