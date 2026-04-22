import  { mockProfile } from "../../service/user/profileService";


export default function CustommerProfile({profile = mockProfile}) {
 return (
     <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={profile.image || "https://via.placeholder.com/80"}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-xl font-semibold">{profile.firstName} {profile.lastName}</h2>
              <p className="text-gray-500 text-sm">
                Member since {profile.createdAt}
              </p>
            </div>
          </div>

          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
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
              <p className="font-medium">{profile.firstName} {profile.lastName}</p>
            </div>

            <div>
              <p className="text-gray-400 uppercase text-xs">Email Address</p>
              <p className="font-medium">{profile.email}</p>
            </div>

            <div>
              <p className="text-gray-400 uppercase text-xs">Phone Number</p>
              <p className="font-medium">{profile.phone}</p>
            </div>

            <div className="flex items-end gap-2">
              <button className="border border-red-500 text-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-50">
                Update Info
              </button>
              <button className="bg-gray-200 px-3 py-1 rounded-md text-sm hover:bg-gray-300">
                Change Password
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
 )
}