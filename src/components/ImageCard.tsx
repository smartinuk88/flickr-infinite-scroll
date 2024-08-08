import { useState } from "react";
import { PhotoWithOwnerandSizes } from "../typings/flickr";
import "./ImageCard.css";

function ImageCard({
  image,
  toggleFavourite,
}: {
  image: PhotoWithOwnerandSizes;
  toggleFavourite: () => void;
}) {
  const fallbackImageUrl = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;

  return (
    <div className="image-card">
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
export default ImageCard;
