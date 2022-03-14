const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    id: []
    // platforms: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }

            case 'GET_GENRE':
            return {
                ...state,
                genres: action.payload
            }
            case 'GET_ID':
                return {
                    ...state,
                    id: action.payload
                }
            // case 'GET_PLATFORMS':
            // return {
            //     ...state,
            //     genre: action.payload
            // }

            case 'GET_NAME_GAMES':
                return {
                    ...state,
                    videogames: action.payload
                }
                case 'FILTER_CREATED':

            const createdFilter = action.payload === 'created' ? state.allVideogames.filter(el => el.createdInDb) : state.allVideogames.filter(el => !el.createdInDb)

            return {
                ...state,
                videogames: createdFilter
            }
           

            case "GENRE_FILTERED":
      const allVideogames = state.allVideogames;
      const genresFiltered =
        action.payload === "all"
          ? allVideogames
          : allVideogames.filter((e) => {
            if (Array.isArray(e.genres)) {
                        let genres = e.genres.map(e => e);
                        return genres.includes(action.payload);
                    }
          });
      return {
        ...state,
        videogames: genresFiltered,
      };

      case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ? state.videogames.sort((a, b) => {
                if (a.name > b.name) return 1
                if (b.name > a.name) return -1
                return 0
            }) :
                state.videogames.sort((a, b) => {
                    if (a.name > b.name) return -1
                    if (b.name > a.name) return 1
                    return 0
                })
                return {
                    ...state,
                    videogames: sortedArr
                }
                case 'ORDER_BY_RATING':
            let sortRating = action.payload === 'menor' ? state.videogames.sort((a, b) => {
                if (a.rating > b.rating) return 1
                if (b.rating > a.rating) return -1
                return 0
            }) :
                state.videogames.sort((a, b) => {
                    if (a.rating > b.rating) return -1
                    if (b.rating > a.rating) return 1
                    return 0
                })
                return {
                    ...state,
                    videogames: sortRating
                }
                case 'POST_GAME':
            return {
                ...state
            }
        default:
            return state;
    }

}

export default rootReducer;