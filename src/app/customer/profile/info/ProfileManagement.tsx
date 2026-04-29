
import { useState, useEffect } from "react";
import { UserProfile } from "../../../../service/user/profileService";
import CustommerProfile from "../../../../components/layout/custommer/profile/CustommerProfile";
import ProfileUpdate from "../../../../components/layout/custommer/profile/updateProfileForm";
import ChangePasswordForm from "../../../../components/layout/custommer/profile/changePasswordForm";
import { useAuthStore } from "../../../../store/authStore";
import { profileService } from "../../../../service/user/profileService";

export default function ProfileInfoPage() {
  const { user } = useAuthStore();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  useEffect(() => {
    if (!user?.accountId) return;

    const fetchProfile = async () => {
      try {
        const res = await profileService.getUserProfile();
        setProfile(res);
      } catch (err) {
        console.error("Lỗi fetch profile", err);
      }
    };

    fetchProfile();
  }, [user?.accountId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <CustommerProfile
        userProfile={profile}
        onEditClick={() => setShowEditPopup(true)}
        onChangePasswordClick={() => setShowPasswordPopup(true)}
      />

      {showEditPopup && (
        <ProfileUpdate
          profile={profile}
          onCancel={() => setShowEditPopup(false)}
        />
      )}

      {showPasswordPopup && (
        <ChangePasswordForm
          userId={user?.accountId || 0}
          onCancel={() => setShowPasswordPopup(false)}
        />
      )}
    </div>
  );
}