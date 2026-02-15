import { GoPlusCircle } from "react-icons/go";
import { useState } from "react";
import AddSkillModal from "../Model/AddSkillModel";

interface AddSkillProps {
  onSkillAdded: () => void;
}

function AddSkill({ onSkillAdded }: AddSkillProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="add-section-container">
      <div className="add-section-box">
        <div className="content-flex">
          <div className="description">
            <div className="content-title">
              Add Your Skill 📜
              <span>(+16%)</span>
            </div>
            <div className="content-para">
              Show what you're best at! More skills make your profile stronger
            </div>
          </div>

          <div className="model-btn">
            <GoPlusCircle onClick={() => setOpen(true)} />
          </div>
        </div>
      </div>

      {open && (
        <AddSkillModal
          onClose={() => setOpen(false)}
          onSave={() => {
            onSkillAdded(); 
            setOpen(false); 
          }}
        />
      )}
    </div>
  );
}

export default AddSkill;
