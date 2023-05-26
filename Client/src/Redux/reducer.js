const initialState = {
    myFavorites: [],
    allCharactersFav: [],
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case "ADD_FAV":
            return {
                ...state,
                myFavorites: actions.payload,
                allCharactersFav: actions.payload,
            }
        case "REMOVE_FAV":
            return {
                ...state,
                myFavorite: actions.payload,
                allCharactersFav: actions.payload,
            }
        case "FILTER":
            const allCharactersFiltered = state.allCharactersFav.filter((char) => char.gender === actions.payload);
            return {
                ...state,
                myFavorites: allCharactersFiltered
            }
        case "ORDER":
            const allCharactersFavCopy = [...state.allCharactersFav];
            return {
                ...state,
                myFavorites:
                    actions.payload === "A"
                        ? allCharactersFavCopy.sort((a, b) => a.id - b.id)
                        : allCharactersFavCopy.sort((a, b) => b.id - a.id)
            }
        default:
            return { ...state };
    }
};

export default reducer;