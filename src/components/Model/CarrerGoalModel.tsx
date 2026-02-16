import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../styles/components/carrer/_carrer-model.scss";

interface Props {
  onClose: () => void;
  onSave: () => void;
  editData?: {
    _id: string;
    description: string;
    longTermGoal: string;
    aspirational: string;
    inspiration: string;
    currentAim: string;
  };
}

function AddCareerGoalModal({ onClose, onSave, editData }: Props) {
  const [formData, setFormData] = useState({
    description: "",
    longTermGoal: "",
    aspirational: "",
    inspiration: "",
    currentAim: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const isEditMode = !!editData;
   const API_URL =  import.meta.env.VITE_API_URL;; 
  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        description: editData.description,
        longTermGoal: editData.longTermGoal,
        aspirational: editData.aspirational || "",
        inspiration: editData.inspiration,
        currentAim: editData.currentAim,
      });
    }
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (isEditMode && editData?._id) {
        await axios.put(
          `${API_URL}/userProfile/career-goals/update/${editData._id}`,
          formData
        );
      } else {
        await axios.post(
          `${API_URL}/userProfile/career-goals/create`,
          formData
        );
      }

      onSave(); 
      onClose(); 
    } catch (err) {
      console.error("Career Goal Save Error:", err);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="career-modal-overlay">
      <div ref={modalRef} className="career-modal-box">
        <h3>{isEditMode ? "Edit Career Goal" : "Add Career Goal"}</h3>

        <div className="career-form">
          <div className="form-group">
            <label>Best Describe You</label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Who you are and what you do"
            />
          </div>

          <div className="form-group">
            <label>Long Term Career Aspiration</label>
            <input
              name="longTermGoal"
              value={formData.longTermGoal}
              onChange={handleChange}
              placeholder="Your long term career goal"
            />
          </div>

          <div className="form-group">
            <label>Aspirational Field</label>
            <input
              name="aspirational"
              value={formData.aspirational}
              onChange={handleChange}
              placeholder="Type your aspirational field"
            />
          </div>

          <div className="form-group">
            <label>Who Inspires You</label>
            <input
              name="inspiration"
              value={formData.inspiration}
              onChange={handleChange}
              placeholder="Mentors, leaders or inspirations"
            />
          </div>

          <div className="form-group">
            <label>What Are You Aiming For Right Now</label>
            <input
              name="currentAim"
              value={formData.currentAim}
              onChange={handleChange}
              placeholder="Current goals or learning paths"
            />
          </div>
        </div>

        <div className="career-modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>
            {isEditMode ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCareerGoalModal;
