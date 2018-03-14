import { ADD_MENU_ITEM } from '../constants/action-types';

const initialState = {
	'menuItems': []
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MENU_ITEM:
			return {
				...state,
				'menuItems': [...state.articles, action.payload]
			};
		default:
			return state;
	}
};

export default rootReducer;
