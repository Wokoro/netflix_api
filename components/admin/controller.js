import dbRef from '../../lib/firebase_storage';
import { randomIndex, sendSuccessMessage, sendErrorMessage } from '../../utils'
import faker from 'faker';

const movies_url = [
    "https://res.cloudinary.com/clyclops/image/upload/v1571168633/movies/6cd6bf6c188e8579261d1e3438780a73_ihxy6s.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571168607/movies/affiche-lost-in-space-2018-2_lpvd6w.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571168582/movies/im4093_Jurassic_World_Fallen_Kingdom_3_aw9umv.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571168558/movies/affiche-the-rain-2018-2_yvusn2.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571168510/movies/0aea10378c24bf520a2724367159ccde_iyignf.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571168483/movies/1700e55a7303e62edeb279ba9bae8801_fttyw4.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571168510/movies/0aea10378c24bf520a2724367159ccde_iyignf.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571168483/movies/1700e55a7303e62edeb279ba9bae8801_fttyw4.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571168429/movies/honest-movie-posters-5_erfe8n.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571168389/movies/cdef6449c3ddb06ef9ec24aebabbdcef_fyfv6e.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571168356/movies/venompostertransform_yypdvx.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571168356/movies/venompostertransform_yypdvx.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571168356/movies/venompostertransform_yypdvx.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571168282/movies/il_794xN.1629865257_qsi7_og6urr.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571167793/movies/all-marvel-movies-the-wolverine-immortal-poster-2013_dyi4kb.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571167771/movies/DfgTZJBVAAAXsEl_hwsz45.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571167729/movies/aHR0cDovL3d3dy5uZXdzYXJhbWEuY29tL2ltYWdlcy9pLzAwMC8xODQvMTExL29yaWdpbmFsL0lyb25NYW5fMi5qcGc_g0usv6.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571167664/movies/rs_634x939-190116090754-634.captain-marvel-poster-2.11619_en4tw2.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571167478/movies/7d06fd4eced48fdcb95f54985239c8b7_tscqlv.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571167269/movies/thor-movie-poster-marvel-cinematic-universe-1038890_beqyeb.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571167219/movies/guardiansofthegalaxy_lob_crd_03_gtkxdp.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571167180/movies/ant-man_lob_crd_01_8_a12zuk.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571167127/movies/71dTyPDP6RL._SY679__vnxqfb.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571167076/movies/spider-man-homecoming-movie-poster-marvel-cinematic-universe-1038913_fwjbrs.jpg",
    "https://res.cloudinary.com/clyclops/image/upload/v1571166861/movies/51k1da28EmL_cvw8vx.jpg"
];

const genres = [
    'Drama', 
    'Crime',
    'Fantasy',
    'Historical',
    'Horror',
    'Mystery',
    'Political',
    'Romance',
    'Saga',
    'Social',
    'Speculative',
    'Thriller'
]

const countries = ['England', 'Holand', 'Nigeria', 'Ghana', 'Cameron'];

const language = ['English', 'French', 'Igbo', 'Yoroba']

const duration = ['1:00:00', '1:20:00', '1:30:00'];

const awards = ['AMA', 'Best Movie of the year', 'Best Script of the year', 'Best fiction of the year', 'Most downloaded']

export const populate = (req, res) => {
    let data = [];
    for(let i=1; i<=20; i ++){
        let data_template = {
            id: i,
            title: faker.lorem.sentence(randomIndex(3, 2)),
            producer: faker.name.findName(),
            rated: randomIndex(5),
            released: faker.date.recent(),
            runtime: duration[randomIndex(2)],
            genre: genres[randomIndex(11)],
            director: faker.name.findName(),
            writer: faker.name.findName(),
            actors: [faker.name.findName(), faker.name.findName(), faker.name.findName(), faker.name.findName()],
            plot: faker.lorem.sentences(randomIndex(3, 1)),
            language: language[randomIndex(3)],
            country: countries[randomIndex(4)],
            awards: awards[randomIndex(4)],
            summary: faker.lorem.paragraph(2),
            poster_url: movies_url[randomIndex(19)]
        }
        dbRef.push(data_template, (err) => {
            if(err){
                return sendErrorMessage(res, 400, 'Error initializing firebase db');
            }else{
               return sendSuccessMessage(res, 400, 'Success initializing firebase db');
            }
        })
       data.push(data_template);
    }
    return sendSuccessMessage(res, 200, 'Population successful');
}

export const getMovies = (req, res ) => {
    dbRef.once('value')
    .then((data) => sendSuccessMessage(res, 200, data));
}