const apiKey = process.env.REACT_APP_FLICKR_API_KEY;
const perPage = 20;

const fetchOwnerInfo = async (userId: string) => {
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
  }
};

export const fetchImages = async (page: number) => {
  try {
    const response = await fetch(
      `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&tags=webdev&safe_search=1&per_page=${perPage}&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`Network response failed: ${response.status}`);
    }

    const data = await response.json();

    const photosWithOwnerInfo = await Promise.all(
      data.photos.photo.map(async (photo: any) => {
        try {
          const ownerInfo = await fetchOwnerInfo(photo.owner);
          return { ...photo, ownerName: ownerInfo.username._content };
        } catch (error) {
          console.error("Error fetching owner info for photo:", error);
          return { ...photo, ownerName: "Unknown" };
        }
      })
    );

    return photosWithOwnerInfo;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};
