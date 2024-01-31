import React, { useContext } from 'react';
import UserContext from '../context/Usercontext';

function Profile() {
    const { user } = useContext(UserContext);

    if (!user) return <div>Please login</div>;

    return <div>Welcome to {user.username}</div>;
}

export default Profile;
