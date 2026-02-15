
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/components/main/_skkill-container.scss";
import AddSkillModal from "../Model/AddSkillModel";
import { GoPlusCircle } from "react-icons/go";

interface SkillItem {
  _id: string;
  skills: string[];
}

interface Props {
  refresh: boolean;
}

function SkillDisplay({ refresh }: Props) {
  const [skillsData, setSkillsData] = useState<SkillItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<string[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/userProfile/skill/fetch",
      );

      if (Array.isArray(res.data)) {
        setSkillsData(res.data);
      } else if (res.data?.skills) {
        setSkillsData([{ _id: res.data._id || "1", skills: res.data.skills }]);
      } else {
        setSkillsData([]);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkillsData([]);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [refresh]);

  const handleEdit = (item: SkillItem) => {
    setEditData(item.skills || []);
    setEditId(item._id);
    setIsModalOpen(true);
  };

  return (
    <div className="skill-container" style={{ marginTop: "10px" }}>
      <div className="skill-card">
        <div className="title">
          <h3>Skills</h3>
          {skillsData.length > 0 && (
            <GoPlusCircle onClick={() => handleEdit(skillsData[0])} />
          )}
        </div>
        <div className="skill-content">
          {skillsData.length === 0 ? (
            <p>No skills added yet.</p>
          ) : (
            skillsData[0].skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddSkillModal
          onClose={() => {
            setIsModalOpen(false);
            setEditData([]);
            setEditId(null);
          }}
          onSave={fetchSkills}
          editSkills={editData}
          skillId={editId || undefined}
        />
      )}
    </div>
  );
}

export default SkillDisplay;
