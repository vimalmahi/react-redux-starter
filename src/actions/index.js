import { ADD_MENU_ITEM } from '../constants/action-types';

export const addMenuItem = menuItem => ({
	'type': ADD_MENU_ITEM,
	'payload': menuItem
});
