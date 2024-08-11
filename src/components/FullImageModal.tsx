import { CSSProperties, MouseEvent, SyntheticEvent, useState } from "react";
import { PhotoWithOwnerandSizes } from "../typings/flickr";
import "./FullImageModal.css";

interface Props {
  image: PhotoWithOwnerandSizes | null;
  onClose: () => void;
}

function FullImageModal({ image, onClose }: Props) {
  const [style, setStyle] = useState<CSSProperties>({});

  const handleImageLoaded = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const aspectRatio = naturalWidth / naturalHeight;
    setStyle({
      width: aspectRatio >= 1 ? "80%" : `calc(80vh * ${aspectRatio})`, // Width is 80% of container or adjusted based on height
      height: aspectRatio >= 1 ? `calc(80vw / ${aspectRatio})` : "80vh", // Height is 80% of viewport height or adjusted based on width
    });
  };

  const handleClickOutside = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("modal__overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal__overlay" onClick={handleClickOutside}>
      <div className="modal__content" style={style}>
        <img
          src={image?.originalImgUrl || image?.smallImgUrl}
          alt={image?.title}
          onLoad={handleImageLoaded}
        />
      </div>
    </div>
  );
}
export default FullImageModal;
