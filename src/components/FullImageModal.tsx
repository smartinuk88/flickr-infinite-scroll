import { MouseEvent } from "react";
import { PhotoWithOwnerandSizes } from "../typings/flickr";
import "./FullImageModal.css";

interface Props {
  image: PhotoWithOwnerandSizes | null;
  onClose: () => void;
}

function FullImageModal({ image, onClose }: Props) {
  const handleClickOutside = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content">
        <img src={image?.originalImgUrl} alt={image?.title} />
      </div>
    </div>
  );
}
export default FullImageModal;
