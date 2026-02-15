import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import "../../styles/components/model/_model.scss";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
  refreshProfile: () => void;
}

const MAX_BIO = 500;

function EditProfileModal({
  isOpen,
  onClose,
  profile,
  refreshProfile,
}: EditProfileModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const [profileImageFile, setProfileImageFile] =
    useState<File | null>(null);
  const [resumeFile, setResumeFile] =
    useState<File | null>(null);

  const [previewImage, setPreviewImage] =
    useState<string | null>(null);

  useEffect(() => {
    if (profile && isOpen) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setEmail(profile.email || "");
      setBio(profile.bio || "");

      if (profile.profileImage) {
        setPreviewImage(
          `http://localhost:8080${profile.profileImage}`
        );
      }
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_BIO) {
      setBio(e.target.value);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleResumeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("bio", bio);

      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      }

      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      await axios.put(
        "http://localhost:8080/userProfile/bio/update-bio-details",
        formData
      );

      alert("Profile Updated Successfully 🚀");

      refreshProfile();
      onClose();
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert("Something went wrong");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content enterprise"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="enterprise-form" onSubmit={handleSubmit}>
      
          <div className="profile-image-wrapper">
            <div className="profile-image-container">
              <img
                src={
                  previewImage ||
                  "https://i.pravatar.cc/150?img=12"
                }
                alt="profile"
              />
              <label className="edit-icon">
                ✎
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Bio (max {MAX_BIO})</label>
            <textarea
              value={bio}
              onChange={handleBioChange}
            />
          </div>

          <div className="resume-box">
            <p>Upload Resume</p>
            <input type="file" onChange={handleResumeUpload} />
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" type="button" onClick={onClose}>
              CANCEL
            </button>

            <button className="update-btn" type="submit">
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
