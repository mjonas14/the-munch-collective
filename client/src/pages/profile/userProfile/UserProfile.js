import React from 'react';

import Auth from '../../../utils/auth';
import ErrorPage from '../../../components/Error';

export default function UserProfile() {

    if (!Auth.loggedIn()) {
        window.location.assign('/');
    }
    return (
        <h1>Hi</h1>
    )
}