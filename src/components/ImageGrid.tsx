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

  return (
    <div className="image-grid">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
export default ImageGrid;
