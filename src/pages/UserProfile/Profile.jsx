import React, { useContext, useState } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import Banner from '../../images/banner.png';
import avatar from '../../images/avatar.png';
import { AuthContext } from '../../AuthContext/AuthContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from '../../AuthContext/AuthAction';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import storage from '../../firebase';

export const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  //const storage = getStorage();

  const [profilePic, setProfilePic] = useState(null);
  const [userInfo, setUserInfo] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInfo({ ...userInfo, [e.target.value]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      //const fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(23).substring(2, 5);
      const storageRef = ref(storage, `/profilePic/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log('Upload is ' + progress + '% done.');
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUserInfo((prev) => {
              return {
                ...prev,
                [item.label]: url,
              };
            });
            setUploaded((prev) => prev + 1);
            console.log('File available at', url);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: profilePic, label: 'profilePic' }]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    const updateUser = {
      userId: user._id,
      userInfo,
    };
    setLoading(true);
    try {
      const res = await axios.put(
        'http://localhost:5001/api/users/' + user._id,
        updateUser,
        {
          headers: {
            token:
              'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
          },
        }
      );
      console.log(res.data);
      dispatch(updateSuccess(res.data));
      toast('Profile updated', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      dispatch(updateFailure());
    } finally {
      setLoading(false);
    }
  };
  console.log(userInfo);
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center bg-black items-center h-[100vh]">
        <form onSubmit={handleUpdate}>
          <div className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dar:!bg-navy-800 dark:text-white dark:!shadow-none">
            <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
              <img
                src={Banner}
                alt="banner"
                className="absolute flex h-32 justify-center rounded-xl bg-cover"
              />
              <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                <img
                  src={
                    profilePic
                      ? URL.createObjectURL(profilePic)
                      : user.profilePic
                  }
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
                <label htmlFor="profilePic">
                  <i className="w-6 h-6 rounded flex items-center justify-center ml-[-25px] cursor-pointer far fa-user-circle"></i>
                </label>
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  style={{ display: 'none' }}
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </div>
            </div>
            <div className="mt-16 flex flex-col items-center">
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                {user?.email}
              </h4>
              <div className="mt-2 text-normal text-navy-700 dark:text-white">
              {user?.username}
                {/* <label className="text-gray-600 w-[150px]">Username: </label>
                <input
                  type="text"
                  placeholder={user?.username}
                  className="outline-none"
                  name="username"
                  onChange={handleChange}
                /> */}
              </div>
            </div>
            {/* <div className="mt-1 flex flex-col items-center">
              <div>
                <label className="text-gray-600 w-[150px]">Password: </label>
                <input
                  type="password"
                  placeholder="*****"
                  name="password"
                  onChange={handleChange}
                  className="outline-none"
                />
              </div> 
            </div>
            {/* <div className="p-4 border-t mx-8 mt-2">
              {uploaded === 1 ? (
                <button
                  onClick={handleUpdate}
                  className=" block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
                >
                  {loading ? 'Updating' : 'Update'}
                </button>
              ) : (
                <button
                  onClick={handleUpload}
                  className=" block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
                >
                  {loading ? 'Uploading Profile Pic' : 'Upload'}
                </button>
              )}
              <ToastContainer />
            </div> */}
          </div>
        </form>
      </div>
    </>
  );
};
