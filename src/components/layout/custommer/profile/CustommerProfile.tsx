import  { UserProfile } from "../../../../service/user/profileService";

type Props = {
  userProfile: UserProfile;
  onEditClick: () => void;
  onChangePasswordClick: () => void;
};

export default function CustommerProfile({ userProfile, onEditClick, onChangePasswordClick }: Props) {
 return (
     <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={userProfile.image ?? "https://thuvienavatar.edu.vn/wp-content/uploads/2025/11/avatar-khung-long-cute-32.jpg"}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-xl font-semibold">{userProfile.firstName} {userProfile.lastName}</h2>
              <p className="text-gray-500 text-sm">
                Member since {userProfile.createdAt}
              </p>
            </div>
          </div>

          <button 
            onClick={onEditClick}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
            ✏️ Edit Personal Information
          </button>
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            👤 Account Details
          </h3>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-400 uppercase text-xs">Full Name</p>
              <p className="font-medium">{userProfile.firstName} {userProfile.lastName}</p>
            </div>

            <div>
              <p className="text-gray-400 uppercase text-xs">Email Address</p>
              <p className="font-medium">{userProfile.email}</p>
            </div>

            <div>
              <p className="text-gray-400 uppercase text-xs">Phone Number</p>
              <p className="font-medium">{userProfile.phone}</p>
            </div>

            <div className="flex items-end gap-2">
              <button 
                onClick={onEditClick}
                className="border border-red-500 text-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-50">
                Update Info
              </button>
              <button 
                onClick={onChangePasswordClick}
                className="bg-gray-200 px-3 py-1 rounded-md text-sm hover:bg-gray-300">
                Change Password
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
 )
}