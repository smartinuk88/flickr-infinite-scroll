import { Owner, PhotoWithOwnerandSizes } from "../typings/flickr";

const apiKey = process.env.REACT_APP_FLICKR_API_KEY;
const perPage = 18;

const fetchOwnerInfo = async (userId: string): Promise<Owner | null> => {
  try {
    const response = await fetch(
      `https://api.flickr.com/services/rest?method=flickr.people.getInfo&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`
    );

    if (!response.ok) {
      throw new Error(`Network response failed: ${response.status}`);
    }

    const data = await response.json();
    return data.person;
  } catch (error) {
    console.error("Error fetching owner info:", error);
    return null;
  }
};

const fetchImageSizes = async (photoId: string) => {
  try {
    const response = await fetch(
      `https://api.flickr.com/services/rest?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`
    );

    if (!response.ok) {
      throw new Error(`Network response failed: ${response.status}`);
    }

    const data = await response.json();
    return data.sizes.size;
  } catch (error) {
    console.error("Error fetching photo sizes:", error);
  }
};

export const fetchImages = async (
  page: number
): Promise<PhotoWithOwnerandSizes[]> => {
  try {
    const response = await fetch(
      `https://api.flickr.com/services/rest?method=flickr.photos.search&tags=cats&api_key=${apiKey}&format=json&nojsoncallback=1&per_page=${perPage}&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`Network response failed: ${response.status}`);
    }

    const data = await response.json();

    const photosWithOwnerandSizeData: PhotoWithOwnerandSizes[] =
      await Promise.all(
        data.photos.photo.map(async (photo: any) => {
          try {
            const ownerInfo = await fetchOwnerInfo(photo.owner);
            const photoSizes = await fetchImageSizes(photo.id);
            const smallPhoto = photoSizes.find(
              (size: any) => size.label === "Small"
            );
            const originalPhoto = photoSizes.find(
              (size: any) => size.label === "Original"
            );
            return {
              ...photo,
              ownerName: ownerInfo?.username._content,
              smallImgUrl: smallPhoto?.source,
              originalImgUrl: originalPhoto?.source,
              isFavourite: false,
            };
          } catch (error) {
            console.error(
              "Error fetching owner and size info for photo:",
              error
            );
            return {
              ...photo,
              ownerName: "Unknown",
              smallImgUrl: null,
              originalImgUrl: null,
              isFavourite: false,
            };
          }
        })
      );

    return photosWithOwnerandSizeData;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};
