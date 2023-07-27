import { combineReducers } from '@reduxjs/toolkit';
import adminReducer from './reducers/admin/adminReducer';
import authReducer from './reducers/auth/authReducer';
import candidateReducer from './reducers/candidate/candidateReducer';
import genericReducer from './reducers/genericReducer';
import layoutReducer from './reducers/layout/layoutReducer';
import recruiterReducer from './reducers/recruiter/recruiterReducers';

export default combineReducers({
    generic: genericReducer,
    authentication: authReducer,
    layout: layoutReducer,
    candidate: candidateReducer,
    recruiter: recruiterReducer,
    admin: adminReducer,
});
