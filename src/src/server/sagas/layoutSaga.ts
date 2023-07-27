import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import {
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidthAction,
    LayoutActionTypes,
} from '../../store/reducers/layout/layoutActions';
import {
    LAYOUT_HORIZONTAL,
    LAYOUT_DETACHED,
    LAYOUT_WIDTH_FLUID,
    LEFT_SIDEBAR_TYPE_SCROLLABLE,
    LAYOUT_VERTICAL,
    LEFT_SIDEBAR_THEME_DEFAULT,
    LEFT_SIDEBAR_TYPE_FIXED,
} from '../../config/constants';

interface FetchChartAction {
    type: string;
    payload: string;
}

/**
 * Changes the body attribute
 */
function changeBodyAttribute(attribute: string, value: string) {
    if (document.body) document.body.setAttribute(attribute, value);
    return true;
}

/**
 * Toggle the class on body
 * @param {*} cssClass
 */
function manageBodyClass(cssClass: string, action = 'toggle') {
    switch (action) {
        case 'add':
            if (document.body) document.body.classList.add(cssClass);
            break;
        case 'remove':
            if (document.body) document.body.classList.remove(cssClass);
            break;
        default:
            if (document.body) document.body.classList.toggle(cssClass);
            break;
    }
    return true;
}

/**
 * ---------------------------------------------------------------------------------------------------------------------------
 * Note: Following are the functions which allows you to save the user prefrences on backend side by making an api request.
 * For now, we are just applying the required logic on frontend side
 * ----------------------------------------------------------------------------------------------------------------------------
 */

/**
 * Changes the layout width
 * @param {*} param0
 */
function* changeLayoutWidth({ payload }: FetchChartAction) {
    try {
        yield call(changeBodyAttribute, 'data-layout-mode', payload);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the layout type
 * @param {*} param0
 */
function* changeLayout({ payload }: FetchChartAction) {
    try {
        yield call(changeBodyAttribute, 'data-layout', payload);
        if (payload === LAYOUT_VERTICAL) {
            yield put(changeSidebarTheme(LEFT_SIDEBAR_THEME_DEFAULT));
            yield put(changeSidebarType(LEFT_SIDEBAR_TYPE_FIXED));
        }

        if (payload === LAYOUT_HORIZONTAL) {
            yield put(changeSidebarTheme(LEFT_SIDEBAR_THEME_DEFAULT));
            yield put(changeSidebarType(LEFT_SIDEBAR_TYPE_FIXED));
        }

        if (payload === LAYOUT_DETACHED) {
            yield put(changeLayoutWidthAction(LAYOUT_WIDTH_FLUID));
            yield put(changeSidebarType(LEFT_SIDEBAR_TYPE_SCROLLABLE));
            yield put(changeSidebarTheme(LEFT_SIDEBAR_THEME_DEFAULT));
        }
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the left sidebar theme
 * @param {*} param0
 */
function* changeLeftSidebarTheme({ payload }: FetchChartAction) {
    try {
        yield call(changeBodyAttribute, 'data-leftbar-theme', payload);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the left sidebar type
 * @param {*} param0
 */
function* changeLeftSidebarType({ payload }: FetchChartAction) {
    try {
        yield call(changeBodyAttribute, 'data-leftbar-compact-mode', payload);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Toggles the rightsidebar
 */
function* toggleRightSidebar() {
    try {
        yield call(manageBodyClass, 'end-bar-enabled');
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Show the rightsidebar
 */
function* showRightSidebar() {
    try {
        yield call(manageBodyClass, 'end-bar-enabled', 'add');
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Hides the rightsidebar
 */
function* hideRightSidebar() {
    try {
        yield call(manageBodyClass, 'end-bar-enabled', 'remove');
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Watchers
 */
export function* watchChangeLayoutType() {
    yield takeEvery(LayoutActionTypes.CHANGE_LAYOUT, changeLayout);
}

export function* watchChangeLayoutWidth() {
    yield takeEvery(LayoutActionTypes.CHANGE_LAYOUT_WIDTH, changeLayoutWidth);
}

export function* watchChangeLeftSidebarTheme() {
    yield takeEvery(LayoutActionTypes.CHANGE_SIDEBAR_THEME, changeLeftSidebarTheme);
}

export function* watchChangeLeftSidebarType() {
    yield takeEvery(LayoutActionTypes.CHANGE_SIDEBAR_TYPE, changeLeftSidebarType);
}

export function* watchToggleRightSidebar() {
    yield takeEvery(LayoutActionTypes.TOGGLE_RIGHT_SIDEBAR, toggleRightSidebar);
}

export function* watchShowRightSidebar() {
    yield takeEvery(LayoutActionTypes.SHOW_RIGHT_SIDEBAR, showRightSidebar);
}

export function* watchHideRightSidebar() {
    yield takeEvery(LayoutActionTypes.HIDE_RIGHT_SIDEBAR, hideRightSidebar);
}

function* LayoutSaga(): any {
    yield all([
        fork(watchChangeLayoutType),
        fork(watchChangeLayoutWidth),
        fork(watchChangeLeftSidebarTheme),
        fork(watchChangeLeftSidebarType),
        fork(watchToggleRightSidebar),
        fork(watchShowRightSidebar),
        fork(watchHideRightSidebar),
    ]);
}

export default LayoutSaga;
