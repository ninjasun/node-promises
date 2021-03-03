import { uniq } from 'ramda'

/** 8.Assumendo di avere 2 chiamate asincrone:
  - getMoviesOf2020 che ritorna una lista di titoli di film prodotti nel 2020
  - getDirectorByTitleMovie get ritorna il direttore dato il titolo del film
  Come scriveresti il metodo getDirectorOf2020 che ritorna tutti gli artisti che hanno prodotto un film nel 2020 ?
  **/

const moviesOf2020 = [
  'Matrix',
  'Avatar',
  'Titanic',
  'Robocop',
  'Ritorno al futuro',
  'Pulp Fiction',
  'Kill Bill'
]

const directorByTitle = {
  Matrix: 'Wachoosky Bros',
  Avatar: 'James Cameron',
  Titanic: 'James Cameron',
  Robocop: 'Paul Verhoeven',
  'Ritorno al futuro': 'Robert Lee Zemeckis',
  'Pulp Fiction': 'Quentin Tarantino',
  'Kill Bill': 'Quentin Tarantino'
}

/**
 * return list of title
 */
const getMoviesOf2020 = async title => {
  return new Promise((resolve, reject) => {
    if (!moviesOf2020) {
      return setTimeout(
        () => reject(new Error('Movies of 2020 not found')),
        5000
      )
    }
    setTimeout(() => resolve(moviesOf2020), 2500)
  })
}

/**
 * param {title}
 * return {directorName}
 * */
async function getDirectorByTitleMovie (title) {
  return new Promise((resolve, reject) => {
    if (!title) {
      return setTimeout(() => reject(new Error('Title is missing')), 5000)
    }
    setTimeout(() => resolve(directorByTitle[title]), 2500)
  })
}

/*
 *  return tutti gli artisti che hanno prodotto un film nel 2020
 */
const getDirectorOf2020 = async () => {
  try {
    const moviesTitle = await getMoviesOf2020()
    /** for each title call ***/
    const directors = await Promise.all(
      moviesTitle.map(title => getDirectorByTitleMovie(title))
    )
    const uniqueDirectors = uniq(directors)
    console.log({ uniqueDirectors })
  } catch (err) {
    return errorHandler(err)
  }
}

getDirectorOf2020()

function errorHandler (err) {
  console.log('err: ', err)
}
