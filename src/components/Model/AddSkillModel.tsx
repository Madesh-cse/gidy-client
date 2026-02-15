// Model/AddSkillModel.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/components/model/_addskillmodel.scss";

interface Props {
  onClose: () => void;
  onSave: () => void;
  editSkills?: string[];
  skillId?: string;
}

const skillSuggestions = [
  "JavaScript",
  "Java",
  "Python",
  "React",
  "Node.js",
  "MongoDB",
  "Docker",
  "TypeScript",
  "HTML",
  "CSS",
  "PHP",
  "C#",
  "SCSS",
  "Express js",
  "SQL",
  "AWS"
];

function AddSkillModal({ onClose, onSave, editSkills, skillId }: Props) {
  const [input, setInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<string[]>([]);

  const isEditMode = !!editSkills && !!skillId;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (isEditMode && editSkills) {
      setSelectedSkills(editSkills);
    }
  }, [editSkills, isEditMode]);

  useEffect(() => {
    if (!input) return setFiltered([]);
    const result = skillSuggestions.filter(
      (skill) =>
        skill.toLowerCase().includes(input.toLowerCase()) &&
        !selectedSkills.includes(skill)
    );
    setFiltered(result);
  }, [input, selectedSkills]);

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setInput("");
    setFiltered([]);
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    try {
      if (isEditMode && skillId) {
        await axios.put(`${API_URL}/userProfile/skill/update/${skillId}`, {
          skills: selectedSkills,
        });
      } else {
        await axios.post(`${API_URL}/userProfile/skill/create`, {
          skills: selectedSkills,
        });
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving skills:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{isEditMode ? "Edit Skills ✏️" : "Add Skills ➕"}</h3>

        <div className="skill-selected-container">
          {selectedSkills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
              <button onClick={() => removeSkill(skill)}>×</button>
            </span>
          ))}
        </div>

        <input
          type="text"
          placeholder="Type a skill..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {filtered.length > 0 && (
          <div className="suggestion-box">
            {filtered.map((skill) => (
              <div key={skill} onClick={() => addSkill(skill)} className="suggestion-item">
                {skill}
              </div>
            ))}
          </div>
        )}

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>{isEditMode ? "Update" : "Add"}</button>
        </div>
      </div>
    </div>
  );
}

export default AddSkillModal;
