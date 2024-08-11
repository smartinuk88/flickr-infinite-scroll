import { useEffect, useRef, useState } from "react";
import "./ImageGrid.css";
import { fetchImages } from "../services/flickrService";
import ImageCard from "./ImageCard";
import { PhotoWithOwnerandSizes } from "../typings/flickr";
import Search from "./Search";

function ImageGrid() {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string>("cats");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<PhotoWithOwnerandSizes[]>([]);

  // Use a Set to track the IDs of images already added
  const imageIds = useRef(new Set<string>());

  const loadImages = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const newImages = await fetchImages(page, tags);

      // Filter out duplicate images based on their ID
      const newUniqueImages = newImages.filter((image) => {
        if (!imageIds.current.has(image.id)) {
          imageIds.current.add(image.id);
          return true;
        }
        return false;
      });

      setImages((prevImages) => [...prevImages, ...newUniqueImages]);
    } catch (error) {
      console.error("Error loading images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, [page, tags]);

  const handleSearch = (newTags: string) => {
    setTags(newTags);
    setPage(1);
    setImages([]);
  };

  const handleScroll = () => {
    const scrollThreshold = 750; // Increase this value for earlier loading

    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - scrollThreshold &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

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
    <>
      <Search onSearch={handleSearch} />
      <div>
        <div className="image-grid">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              toggleFavourite={() => toggleFavourite(image.id)}
            />
          ))}
        </div>

        {loading && (
          <div className="image-grid__loading-indicator">
            <p>Loading images...</p>
          </div>
        )}
      </div>
    </>
  );
}
export default ImageGrid;
