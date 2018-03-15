import { ADD_MENU_ITEM, TOGGLE_MENU } from '../constants/action-types';

const initialState = {
	'menuItems': [{
		'name': 'Home',
		'icon': 'dashboard',
		'children': [{
			'name': 'submenu 1',
			'icon': 'adjust'
		}, {
			'name': 'submenu 2',
			'icon': 'address-card'
		}]
	}, {
		'name': 'Overview',
		'icon': 'list'
	}, {
		'name': 'Reports',
		'icon': 'clock-o'
	}, {
		'name': 'Analytics',
		'icon': 'th'
	}]
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MENU_ITEM:
			return {
				...state,
				'menuItems': [...state.menuItems, action.payload]
			};
		case TOGGLE_MENU: {
			const tempMenuItems = [...state.menuItems];
			const menu = tempMenuItems.find((element) => {
				return element.name === action.payload.name;
			});
			menu.active = !menu.active;

			return {
				...state,
				'menuItems': [...tempMenuItems]
			};
		}
		default:
			return state;
	}
};

export default rootReducer;
