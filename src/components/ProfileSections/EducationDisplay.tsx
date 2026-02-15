import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoPlusCircle } from "react-icons/go";
import EducationModal from "../Model/AddEducationModel";
import type {
  EducationModalRef,
  EducationData,
} from "../Model/AddEducationModel";
import { GiGraduateCap } from "react-icons/gi";

function EducationDisplay() {
  const [educationList, setEducationList] = useState<EducationData[]>([]);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const modalRef = useRef<EducationModalRef>(null);
  const API_URL = process.env.REACT_APP_API_URL; 

  const fetchEducation = async () => {
    const res = await axios.get(
      `${API_URL}/userProfile/edu/edu-details`,
    );
    setEducationList(res.data.education);
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleSave = (savedEdu: EducationData) => {
    setEducationList((prev) => {
      const exists = prev.find((e) => e._id === savedEdu._id);

      if (exists) {
        return prev.map((e) => (e._id === savedEdu._id ? savedEdu : e));
      }

      return [savedEdu, ...prev];
    });
  };

  const handleEdit = (edu: EducationData) => {
    modalRef.current?.open(edu);
    setActiveDropdown(null);
  };

  return (
    <>
      <div className="Exprience-container">
        <div className="exprience-card">
          <div className="flex-layout">
            <h4>Education</h4>
            <div className="model-btn" onClick={() => modalRef.current?.open()}>
              <GoPlusCircle />
            </div>
          </div>

          {educationList.map((edu) => (
            <div key={edu._id} className="experience-item">
              <div className="exp-left">
                <div className="exp-content">
                  <div className="exp-img">
                    <GiGraduateCap/>
                  </div>
                  <div className="exp-info">
                    <h5>
                      {edu.degree} - {edu.fieldOfStudy}
                    </h5>
                    <p>{edu.college}, {edu.location}</p>
                    <span className="date">
                      {new Date(edu.startDate).getFullYear()} -{" "}
                      {edu.endDate
                        ? new Date(edu.endDate).getFullYear()
                        : "Present"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="dropdown-wrapper">
                <BsThreeDotsVertical
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === edu._id ? null : edu._id,
                    )
                  }
                />

                {activeDropdown === edu._id && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleEdit(edu)}>Edit</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <EducationModal ref={modalRef} onSave={handleSave} />
    </>
  );
}

export default EducationDisplay;
