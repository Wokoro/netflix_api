import userRoutes from './users/routes';
import favoriteMoviesRoutes from './favorites/routes';
import adminRoutes from './admin/routes'

export default [...userRoutes, ...favoriteMoviesRoutes, ...adminRoutes];
