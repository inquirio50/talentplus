import { all } from 'redux-saga/effects';
import adminSaga from './adminSaga';
import authSaga from './authSaga';
import candidateSaga from './candidateSaga';
import recruiterSaga from './recruiterSaga';
import LayoutSaga from './layoutSaga';
import profileSaga from './profileSaga';

export default function* rootSaga() {
    yield all([authSaga(), LayoutSaga(), candidateSaga(), profileSaga(), recruiterSaga(), adminSaga()]);
}
