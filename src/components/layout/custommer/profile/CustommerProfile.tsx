import { UserProfile } from "../../../../service/user/profileService";

type Props = {
  userProfile: UserProfile;
  onEditClick: () => void;
  onChangePasswordClick: () => void;
};

export default function CustommerProfile({ userProfile, onEditClick, onChangePasswordClick }: Props) {
  return (

    <div className="max-w-5xl mx-auto space-y-6">

      {/* Account Details */}
      <div className="bg-white rounded-xl shadow p-6">
        <img
          src={userProfile.image ?? "https://thuvienavatar.edu.vn/wp-content/uploads/2025/11/avatar-khung-long-cute-32.jpg"}
          alt="avatar"
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <p className="text-gray-500 text-sm">
            Member since {userProfile.createdAt}
          </p>
        </div>

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
  )
}