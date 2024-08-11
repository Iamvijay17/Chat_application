import { apiClient } from '@/lib/api-client';
import { useAppStore } from '@/store';
import { REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE, HOST } from '@/utils/constant';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const Profile = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const profileImageRef = useRef(null);
  const [profileData, setProfileData] = useState({
    email: userInfo?.email || '',
    image: '',
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
  });

  useEffect(() => {
    if (userInfo) {
      setProfileData({
        email: userInfo.email,
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        image: userInfo.image ? `${HOST}/${userInfo.image}` : '',
      });
    }
  }, [userInfo, profileData.image, profileImageRef]);

  const validateProfile = () => {
    if (!profileData.firstName) {
      toast.error('First Name required');
      return false;
    }
    if (!profileData.lastName) {
      toast.error('Last Name required');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(UPDATE_PROFILE_ROUTE, profileData, { withCredentials: true });
        if (profileImageRef.current?.files[0]) {
          handleProfileImage({ target: { files: [profileImageRef.current.files[0]] } });
        }
        if (response.status === 200) {
          toast.success('Profile updated successfully');
          navigate('/chat');
        }
      } catch (error) {
        toast.error('Failed to update profile');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileImage = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('profile_image', file);
      try {
        const response = await apiClient.post(UPDATE_PROFILE_IMAGE_ROUTE, formData, { withCredentials: true });
        if (response.status === 200 && response.data.image) {
          setProfileData((prevData) => ({ ...prevData, image: response.data.image }));
          useAppStore.setState((state) => ({
            userInfo: {
              ...state.userInfo,
              image: response.data.image,
            },
          }));
          toast.success('Profile Image Updated successfully');
        }
      } catch (error) {
        toast.error('Failed to update profile image');
      }
    }
  };

  const handleRemoveProfileImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, { withCredentials: true });
      if (response.status === 200) {
        setProfileData((prevData) => ({ ...prevData, image: '' }));
        useAppStore.setState((state) => ({
          userInfo: {
            ...state.userInfo,
            image: '',
          },
        }));
        toast.success('Profile Image Removed successfully');
      }
    } catch (error) {
      toast.error('Failed to remove profile image');
    }
  };


  return (
    <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <div className="border-b px-4 pb-6">
          <div className="text-center my-4">
            <Avatar className="text-gray-800 h-32 w-32 cursor-pointer rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4" onClick={() => profileImageRef.current.click()}>
              <AvatarImage  src={profileData.image} alt=""/>
              <AvatarFallback>{profileData?.firstName?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <input
              type="file"
              ref={profileImageRef}
              style={{ display: 'none' }}
              onChange={handleProfileImage}
              accept="image/*"
              name="profile_image"
            />
            {profileData.image && (
              <Badge 
                variant="outline" 
                className="cursor-pointer" 
                onClick={handleRemoveProfileImage}
              >
    Remove
              </Badge>
            )}


            <div className="py-2">
              <h3 className="text-2xl text-gray-800 dark:text-white mb-1">
                {`${profileData.firstName} ${profileData.lastName}`}
              </h3>
              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                <svg
                  className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                  />
                </svg>
                New York, NY
              </div>
            </div>
          </div>

          <div className="flex gap-2 px-2 pb-2">
            <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition w-full">
              <input
                type="email"
                id="login-email"
                name="email"
                className="cursor-not-allowed w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your email"
                value={profileData?.email}
                onChange={handleInputChange}
                disabled
              />
            </div>
          </div>

          <div className="flex gap-2 px-2 pb-2">
            <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition w-full">
              <input
                type="text"
                id="profile-firstName"
                name="firstName"
                className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your First Name"
                onChange={handleInputChange}
                value={profileData?.firstName}
              />
            </div>
          </div>

          <div className="flex gap-2 px-2 pb-4">
            <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition w-full">
              <input
                type="text"
                id="profile-lastName"
                name="lastName"
                className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your Last Name"
                onChange={handleInputChange}
                value={profileData?.lastName}
              />
            </div>
          </div>

          <div className="flex gap-2 px-2">
            <button
              onClick={() => setProfileData({ ...profileData, firstName: '', lastName: '' })}
              className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
            >
              Save
            </button>
          </div>
        </div>
        <div className="px-4 py-4">
          <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
            <svg
              className="h-6 w-6 text-gray-600 dark:text-gray-400"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
              />
            </svg>
            <span>
              <strong className="text-black dark:text-white">12</strong> Followers you know
            </span>
          </div>
          <div className="flex">
            <div className="flex justify-end mr-2">
              <img
                className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt=""
              />
              {/* multipule img */}
              <span
                className="flex items-center justify-center bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-full h-10 w-10"
              >
                +99
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
