import { useEffect, useState, useTransition } from "react";
import "./ImageGrid.css";
import { fetchImages } from "../services/flickrService";
import { PhotoWithOwner } from "../typings/flickr";

function ImageGrid() {
  const [images, setImages] = useState<PhotoWithOwner[]>([]);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const loadImages = async () => {
      const newImages = await fetchImages(page);
      setImages((prevImages) => [...prevImages, ...newImages]);
    };

    startTransition(() => {
      loadImages();
    });
  }, [page]);
  return <div className="image-grid">ImageGrid</div>;
}
export default ImageGrid;
