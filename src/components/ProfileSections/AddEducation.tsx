import "../../styles/components/main/_add-education.scss";
import { GoPlusCircle } from "react-icons/go";
import { useRef } from "react";
import EducationModal from "../Model/AddEducationModel";
import type { EducationModalRef } from "../Model/AddEducationModel";

interface Props {
  onEducationAdded: () => void;
}

function AddEducation({ onEducationAdded }: Props) {
  const eduModalRef = useRef<EducationModalRef>(null);

  return (
    <>
      <div className="add-section-container">
        <div className="add-section-box">
          <div className="content-flex">
            <div className="description">
              <div className="content-title">
                Upload Your Education 🎓 <span>(+50%)</span>
              </div>
              <div className="content-para">
                Add your college, degree, and study details.
              </div>
            </div>

            <div className="model-btn" onClick={() => eduModalRef.current?.open()}>
              <GoPlusCircle size={26} />
            </div>
          </div>
        </div>
      </div>
      <EducationModal
        ref={eduModalRef}
        onSave={onEducationAdded}
      />
    </>
  );
}

export default AddEducation;
