import { PhotoWithOwnerandSizes } from "../typings/flickr";
import "./ImageCard.css";

function ImageCard({ image }: { image: PhotoWithOwnerandSizes }) {
  const fallbackImageUrl = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;

  return (
    <div className="image-card">
      <img
        className="image-card__image"
        src={image.smallImgUrl ? image.smallImgUrl : fallbackImageUrl}
        alt={image.title}
      />
    </div>
  );
}
export default ImageCard;
