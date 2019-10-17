import { populate, getMovies } from './controller'

export default [
    {
        path: '/populate',
        method:'get', 
        handlers: [populate]
    },
    {
        path: '/getmovies',
        method: 'get',
        handlers: [getMovies ]
    }
]