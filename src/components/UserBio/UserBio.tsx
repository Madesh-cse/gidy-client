import "../../styles/components/main/_main.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateProfileModel from "../Model/CreateProfileModel";
import EditProfileModel from "../Model/EditProfileModel";
import { FiDownload } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";

function UserBio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/userProfile/bio/bio-details`,
      );
      setProfile(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className="user-bio-container">
        <div className="user-bio-card">
          <div className="user-profile-flex">
            <div className="user-left-column">
              <div className="user-profile-image">
                <img
                  src={
                    profile?.profileImage
                      ? `${API_URL}${profile.profileImage}`
                      : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211471.png"
                  }
                  alt="profile"
                />
              </div>

              <div className="user-profile-name">
                <h1>
                  {profile
                    ? `${profile.firstName} ${profile.lastName}`
                    : "Your Name"}
                </h1>
                <span>(Final Year Student)</span>
              </div>
            </div>
            {/* <p className="Location">Madurai</p> */}
            <div className="user-right-column">
              <div className="three-dot" onClick={() => setMenuOpen(!menuOpen)}>
                ⋮
              </div>
              {menuOpen && (
                <div className="edit-dropdown">
                  {/* CREATE */}
                  {!profile && (
                    <button
                      onClick={() => {
                        setIsCreateOpen(true);
                        setMenuOpen(false);
                      }}
                    >
                      Create Profile
                    </button>
                  )}

                  {/* EDIT */}
                  {profile && (
                    <button
                      onClick={() => {
                        setIsEditOpen(true);
                        setMenuOpen(false);
                      }}
                    >
                      Edit Profiles
                    </button>
                  )}

                  <button>Share Profile</button>
                  <button>Report</button>
                </div>
              )}
            </div>
          </div>
          <div className="user-bio-text">
            <p>
              {profile?.bio
                ? profile.bio
                : "Add your professional bio to showcase your expertise."}
            </p>
          </div>
          <div className="user-achivement">
            <div className="user-achivement-flex">
              <div className="user-mail-resume">
                <div className="user-email">
                  {profile?.email && (
                    <a href={`mailto:${profile.email}`}  className="email-link"><FaRegEnvelope className="email-icon" />{profile.email}</a>
                  )}
                </div>

                {profile?.resume && (
                  <div className="download-resume">
                    <a
                      href={`${API_URL}${profile.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                     <FiDownload/> Download Resume
                    </a>
                  </div>
                )}
              </div>
              <div className="user-reward">
                <div className="reward-box">
                  <div className="reward-flex">
                    <div className="reward-img">
                      <img src="https://d2d0jobwzy0nc3.cloudfront.net/leagues/league-mhabbrl1lralz2?v=1771032854709" alt="prize" />
                    </div>
                    <div className="reward-caatagory">
                      <div className="league">
                        <p>League</p>
                        <h4>Bronze</h4>
                      </div>
                      <div className="rank">
                        <p>Rank</p>
                        <h4>30</h4>
                      </div>
                      <div className="points">
                        <p>Points</p>
                        <h4>50</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="review-awards">
            <p>View My Rewards</p>
            <span><FaGreaterThan/></span>
          </div>
        </div>
      </div>
      <CreateProfileModel
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        refreshProfile={fetchProfile}
      />
      <EditProfileModel
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        refreshProfile={fetchProfile}
      />
    </section>
  );
}

export default UserBio;
