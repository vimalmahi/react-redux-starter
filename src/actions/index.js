import { ADD_MENU_ITEM, TOGGLE_MENU } from '../constants/action-types';

export const addMenuItem = menuItem => ({
	'type': ADD_MENU_ITEM,
	'payload': menuItem
});

export const toggleMenuItem = menuItem => ({
	'type': TOGGLE_MENU,
	'payload': menuItem
});
