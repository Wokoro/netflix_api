import userRoutes from './users/routes';
import favoriteMoviesRoutes from './favorites/routes'

export default [...userRoutes, ...favoriteMoviesRoutes];
