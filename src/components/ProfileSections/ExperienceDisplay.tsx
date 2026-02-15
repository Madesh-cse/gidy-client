import { GoPlusCircle } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../styles/components/main/_display-content.scss";
import { BsBuildings } from "react-icons/bs";

import ExperienceModal from "../Model/Addexperiencemodel";
import type {
  ExperienceData,
  ExperienceModalHandle,
} from "../Model/Addexperiencemodel";

interface Experience extends ExperienceData {
  _id: string;
}

function ExprienceDisplay() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const modalRef = useRef<ExperienceModalHandle>(null);
   const API_URL = process.env.REACT_APP_API_URL; 

  // 🔥 Fetch from backend
  const fetchExperiences = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/userProfile/exp/fetch`,
      );
      setExperiences(res.data.exprience);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // 🔥 Toggle dropdown
  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // 🔥 Open Add Modal
  const handleAddClick = () => {
    modalRef.current?.open();
  };

  // 🔥 Open Edit Modal with Prefill
  const handleEdit = (exp: Experience) => {
    modalRef.current?.open(exp);
    setActiveDropdown(null);
  };

  // 🔥 Handle Save (Add or Update)
  const handleSaveExperience = (data: Experience) => {
    setExperiences((prev) => {
      const exists = prev.find((e) => e._id === data._id);

      if (exists) {
        // UPDATE instantly
        return prev.map((e) => (e._id === data._id ? data : e));
      }

      // ADD instantly
      return [...prev, data];
    });
  };

  return (
    <div className="Exprience-container">
      <div className="exprience-card">
        <div className="flex-layout">
          <h4>Experience</h4>
          <div className="model-btn" onClick={handleAddClick}>
            <GoPlusCircle />
          </div>
        </div>
        {experiences.length === 0 && (
          <p className="default-exp-text">No experience added yet.</p>
        )}
        {experiences.map((exp) => (
          <div key={exp._id} className="experience-item">
            <div className="exp-left">
              <div className="exp-content">
                <div className="exp-img">
                  <BsBuildings/>
                </div>
                <div className="exp-info">
                  <h5>{exp.role}</h5>
                  <p>{exp.company} , <span>{exp.location}</span></p>
                  <span className="date">
                    {exp.joinDate} -{" "}
                    {exp.currentlyWorking ? "Present" : exp.leaveDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="dropdown-wrapper">
              <BsThreeDotsVertical onClick={() => toggleDropdown(exp._id)} />

              {activeDropdown === exp._id && (
                <div className="dropdown-menu">
                  <button onClick={() => handleEdit(exp)}>Edit</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ExperienceModal ref={modalRef} onSave={handleSaveExperience} />
    </div>
  );
}

export default ExprienceDisplay;
