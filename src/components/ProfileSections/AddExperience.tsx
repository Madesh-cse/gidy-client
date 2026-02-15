import { GoPlusCircle } from "react-icons/go";
import { useRef } from "react";
import ExperienceModal from "../Model/Addexperiencemodel";
import type {
  ExperienceData,
  ExperienceModalHandle,
} from "../Model/Addexperiencemodel";

interface AddExperienceProps {
  onSaveExperience: (data: ExperienceData) => void;
}

function AddExperience({ onSaveExperience }: AddExperienceProps) {
  const modalRef = useRef<ExperienceModalHandle>(null);

  const handleOpen = () => {
    modalRef.current?.open();  
  };

  const handleSave = (data: ExperienceData) => {
    onSaveExperience(data);    
  };

  return (
    <>
      <div className="add-section-container">
        <div className="add-section-box">
          <div className="content-flex">
            <div className="description">
              <div className="content-title">
                Add Your Experience 💼
                <span>(+20%)</span>
              </div>
              <div className="content-para">
                Showcase your work history and professional background.
              </div>
            </div>

            <div className="model-btn" onClick={handleOpen}>
              <GoPlusCircle size={24} />
            </div>
          </div>
        </div>
      </div>

      <ExperienceModal
        ref={modalRef}
        onSave={handleSave} 
      />
    </>
  );
}

export default AddExperience;
