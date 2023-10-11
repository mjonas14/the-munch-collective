import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GET_USER_BY_ID } from "../utils/queries";
import Auth from "../utils/auth";

export default async function CurrentUser() {
    const { loading, data } = useQuery(QUERY_GET_USER_BY_ID, {
        variables: { userId: Auth.getProfile().data._id }
    });
    const myId = data?.getUserById._id || '';
    console.log(myId, "from function!");
    return myId;
};
