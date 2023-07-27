/* eslint-disable default-param-last */
import {
    LAYOUT_VERTICAL,
    LAYOUT_WIDTH_FLUID,
    LEFT_SIDEBAR_THEME_DARK,
    LEFT_SIDEBAR_TYPE_FIXED,
} from '../../../config/constants';
import { Action, State } from '../../../config/interfaces';
import { LayoutActionTypes } from './layoutActions';

const initialState: State = {
    layoutType: LAYOUT_VERTICAL,
    layoutWidth: LAYOUT_WIDTH_FLUID,
    leftSideBarTheme: LEFT_SIDEBAR_THEME_DARK,
    leftSideBarType: LEFT_SIDEBAR_TYPE_FIXED,
    showRightSidebar: false,
};

const layoutReducer = (state: State = initialState, { type, payload }: Action): any => {
    switch (type) {
        case LayoutActionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layoutType: payload,
            };
        case LayoutActionTypes.CHANGE_LAYOUT_WIDTH:
            return {
                ...state,
                layoutWidth: payload,
            };
        case LayoutActionTypes.CHANGE_SIDEBAR_THEME:
            return {
                ...state,
                leftSideBarTheme: payload,
            };
        case LayoutActionTypes.CHANGE_SIDEBAR_TYPE:
            return {
                ...state,
                leftSideBarType: payload,
            };
        case LayoutActionTypes.TOGGLE_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: !state.showRightSidebar,
            };
        case LayoutActionTypes.SHOW_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: true,
            };
        case LayoutActionTypes.HIDE_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: false,
            };
        default:
            return state;
    }
};

export default layoutReducer;
