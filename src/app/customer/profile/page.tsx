import { mockProfile } from "../../../service/user/profileService";
import ProfileUpdate from "../../../components/profile/updateProfileForm";
import ChangePasswordForm from "../../../components/profile/changePasswordForm";
import { useAuthStore } from "../../../store/authStore";
import CustommerProfile from "../../../components/profile/CustommerProfile";

export default function CustomerProfilePage() {
  const profile = mockProfile;
  const { user } = useAuthStore();

  return (
    <div>    
      <CustommerProfile profile={profile} />
      <ProfileUpdate profile={profile} />
      {user?.accountId && <ChangePasswordForm userId={user.accountId} />}
    </div>
  );
}
