import "../../styles/components/main/_level-up-profile.scss";
import { useState } from "react";
import AddEducation from "./AddEducation";
import AddSkill from "./AddSkill";
import UploadCerificate from "./UploadCerificate";
import AddExperience from "./AddExperience";
import SkillDisplay from "./SkillDisplay";

function ProfileSection() {
  const [educationAdded, setEducationAdded] = useState(false);
  const [experienceAdded, setExperienceAdded] = useState(false);
  const [skillRefresh, setSkillRefresh] = useState(false); 

  const progress =
    (educationAdded ? 33 : 0) +
    (skillRefresh ? 33 : 0) +
    (experienceAdded ? 34 : 0);

  return (
    <div className="mani-container">
      <div className="section-level-container">
        <div className="level-up-card">
          <div className="level-title">
            <h3>🎓 Level Up Profile</h3>
            <p>
              Just a few clicks away from awesomeness, complete your profile!
            </p>
            <div className="progress-wrapper">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span>{progress}%</span>
            </div>
          </div>
          <div className="list-section">
            <AddEducation onEducationAdded={() => setEducationAdded(true)} />
            <AddSkill onSkillAdded={() => setSkillRefresh((prev) => !prev)} />
            <UploadCerificate />
            <AddExperience onSaveExperience={() => setExperienceAdded(true)} />
          </div>
        </div>
      </div>
      <SkillDisplay refresh={skillRefresh} />
    </div>
  );
}

export default ProfileSection;
