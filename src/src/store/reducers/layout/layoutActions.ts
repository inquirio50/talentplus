type LatoutType = {
    CHANGE_LAYOUT: string;
    CHANGE_LAYOUT_WIDTH: string;
    CHANGE_SIDEBAR_THEME: string;
    CHANGE_SIDEBAR_TYPE: string;

    TOGGLE_RIGHT_SIDEBAR: string;
    SHOW_RIGHT_SIDEBAR: string;
    HIDE_RIGHT_SIDEBAR: string;
};

export const LayoutActionTypes: LatoutType = {
    CHANGE_LAYOUT: '@@layout/CHANGE_LAYOUT',
    CHANGE_LAYOUT_WIDTH: '@@layout/CHANGE_LAYOUT_WIDTH',
    CHANGE_SIDEBAR_THEME: '@@layout/CHANGE_SIDEBAR_THEME',
    CHANGE_SIDEBAR_TYPE: '@@layout/CHANGE_SIDEBAR_TYPE',

    TOGGLE_RIGHT_SIDEBAR: '@@layout/TOGGLE_RIGHT_SIDEBAR',
    SHOW_RIGHT_SIDEBAR: '@@layout/SHOW_RIGHT_SIDEBAR',
    HIDE_RIGHT_SIDEBAR: '@@layout/HIDE_RIGHT_SIDEBAR',
};

type LayoutAction = { type: string; payload?: string | null };

export const changeSidebarTheme = (theme: string): LayoutAction => ({
    type: LayoutActionTypes.CHANGE_SIDEBAR_THEME,
    payload: theme,
});

/* **************  NOT USED FOR NOW ************** */

export const changeLayout = (layout: string): LayoutAction => ({
    type: LayoutActionTypes.CHANGE_LAYOUT,
    payload: layout,
});

export const changeLayoutWidthAction = (width: string): LayoutAction => ({
    type: LayoutActionTypes.CHANGE_LAYOUT_WIDTH,
    payload: width,
});

export const changeSidebarType = (sidebarType: string): LayoutAction => ({
    type: LayoutActionTypes.CHANGE_SIDEBAR_TYPE,
    payload: sidebarType,
});

export const toggleRightSidebar = (): LayoutAction => ({
    type: LayoutActionTypes.TOGGLE_RIGHT_SIDEBAR,
    payload: null,
});

export const showRightSidebar = (): LayoutAction => ({
    type: LayoutActionTypes.SHOW_RIGHT_SIDEBAR,
    payload: null,
});

export const hideRightSidebar = (): LayoutAction => ({
    type: LayoutActionTypes.HIDE_RIGHT_SIDEBAR,
    payload: null,
});
