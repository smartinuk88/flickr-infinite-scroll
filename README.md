# Flickr Infinite Scroller

A web application that utilises the Flickr API to allow users to search image tags and favourite the images that they like. The app optimises image loading by implementing infinite scroll functionality.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository

### `git clone https://github.com/smartinuk88/flickr-infinite-scroll.git`

2. Navigate to the project directory:
   Replace your-project-directory with the name of the folder that was created when you cloned your repository:

### `cd yourrepository`

3. Install dependencies

### `npm install`

4. Start the development server:

### `npm start`

This will run the app in development mode. Open http://localhost:3000 to view it in the browser.

## Build Considerations

### Image Size Fetching Strategy

- **Decision**: Conscious of already having to make an API call for every photo to fetch the owner data, chose not to make an extra API call to fetch all image sizes for every image initially. Instead, the app loads using the default image size provided by the API and fetches full original sizes only when a user clicks on an image.
- **Reasoning**: This approach slightly sacrifices initial image optimisation but minimizes API calls, significantly reducing costs if it were a production environment.

### Grid Layout

- **Decision**: Implemented a uniform aspect ratio tiled grid as per the provided design images instead of a masonry layout.
- **Reasoning**: Ensures consistency in presentation. Although masonry would handle diverse image dimensions more dynamically, a uniform grid aligns better with the design specifications and provides a consistent user experience.

### Persistent Storage of Favourites

- **Decision**: Utilised local storage for persisting user favourites.
- **Reasoning**: Offers a simple, quick solution without the need for backend modifications. For production, it would be recommended to integrate a database with authentication, which would allow personalising and securing user data.

### Lazy Loading Optimization

- **Potential Improvements**: Consider further implementing lazy loading on individual images using the Intersection Observer API for enhanced performance. This approach would load images only when they are about to enter the viewport, reducing initial load time and saving bandwidth.

## Authors

Scott Martin
