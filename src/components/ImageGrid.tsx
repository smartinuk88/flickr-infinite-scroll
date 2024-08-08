import { useEffect, useState, useTransition } from "react";
import "./ImageGrid.css";
import { fetchImages } from "../services/flickrService";
import { PhotoWithOwnerandSizes } from "../typings/flickr";
import ImageCard from "./ImageCard";

function ImageGrid() {
  const [images, setImages] = useState<PhotoWithOwnerandSizes[]>([]);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const loadImages = async () => {
      const newImages = await fetchImages(page);
      setImages(newImages);
    };

    startTransition(() => {
      loadImages();
    });
  }, [page]);

  const toggleFavourite = (photoId: string) => {
    let favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

    if (favourites.includes(photoId)) {
      // Remove from favourites
      favourites = favourites.filter((id: string) => id !== photoId);
    } else {
      // Add to favourites
      favourites.push(photoId);
    }

    // Update local storage
    localStorage.setItem("favourites", JSON.stringify(favourites));

    // Update the images state
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === photoId
          ? { ...image, isFavourite: !image.isFavourite }
          : image
      )
    );
  };

  return (
    <div className="image-grid">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          toggleFavourite={() => toggleFavourite(image.id)}
        />
      ))}
    </div>
  );
}
export default ImageGrid;
