import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import { USERS, updateUser } from '../../firebase/index';
import firebase from '../../firebase/clientApp';

import { useUser } from '../components/user-context';
import LoadingError from '../components/LoadingError';
import Card from '../components/Card';
import ProfileForm from '../components/ProfileForm';

const Profile = () => {
  const { user } = useUser();
  const { uid } = useParams();

  const db = firebase.firestore();

  const [userDoc, loading, error] = useDocumentData(
    db.collection(USERS).doc(uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // Check if current user is an admin
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    if (user) {
      db.collection(USERS)
        .doc(user.uid)
        .get()
        .then((currentUser) => setAdminMode(currentUser.data().isAdmin));
    }
  }, []);


  const setUserDoc = (doc) => {
    db.collection(USERS).doc(uid).set(doc, { merge: true });
  };

  return (
    <main>
      <Card>
        <h1 className="text-2xl leading-6 font-medium text-gray-900">
          {`Edit ${userDoc?.uid === user.uid ? 'your' : 'user'} profile`}
        </h1>
      </Card>

      <LoadingError data={userDoc} loading={loading} error={error}>
        {userDoc && (
          <>
            <Card>
              <ProfileForm
                userDoc={userDoc}
                isCurrentUser={userDoc.uid === user.uid}
                adminMode={adminMode}
              />
            </Card>
          </>
        )}
      </LoadingError>
      {/* Add toggle for if user is admin */}
      {adminMode ? (
        <div className='bg-white rounded-lg w-11/12 sm:w-6/12 mx-auto my-4 z-10 px-4 py-5 sm:p-6 flex flex-row justify-between'>
          <h3 className='text-2xl leading-6 font-medium text-gray-900'>Admin</h3>
          <input type='checkbox'
            checked={userDoc?.isAdmin}
            onChange={(e) => {
              // Update user in firestore 
              updateUser(uid, { isAdmin: e.target.checked });
              // Update user in state 
              setUserDoc({ ...userDoc, isAdmin: e.target.checked });
            }}
          />
        </div>
      ) : null}
    </main>
  );
};

export default Profile;
