import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/components/carrer/_carrer-card.scss";
import AddCareerGoalModal from "../Model/CarrerGoalModel";

interface CareerGoal {
  _id: string;
  description: string;
  longTermGoal: string;
  aspirational: string;
  inspiration: string;
  currentAim: string;
}

function CarrerGoals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [careerGoals, setCareerGoals] = useState<CareerGoal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<CareerGoal | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  // Fetch all career goals
  const fetchGoals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/userProfile/career-goals/fetch",
      );
      setCareerGoals(response.data.goals || []);
    } catch (err) {
      console.error("Error fetching career goals:", err);
      setCareerGoals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddNew = () => {
    setSelectedGoal(undefined); // no editData, open modal for adding
    setIsModalOpen(true);
  };

  const handleEdit = (goal: CareerGoal) => {
    setSelectedGoal(goal); // set editData for modal
    setIsModalOpen(true);
  };

  if (loading) return <p>Loading career goals...</p>;

  return (
    <section>
      <div className="carrer-container">
        <div className="career-card">
          {careerGoals.length > 0 ? (
            <>
              <div className="carrer-content-layout">
                <div className="carrer-left-row">
                  {careerGoals.map((goal) => (
                    <div key={goal._id} className="career-goal-item">
                      <div className="current-aim">
                        <p>You're Career Vision</p>
                        <h2>{goal.currentAim}</h2>
                      </div>
                      <hr />
                      <div className="carrer-layout">
                        <div className="growing">
                          <p>What you’re growing into right now</p>
                          <h3>{goal.aspirational}</h3>
                        </div>
                        <div className="space">
                          <p>The space you want to grow in</p>
                          <h3>{goal.longTermGoal}</h3>
                        </div>
                        <div>
                          <p>Inspired by</p>
                          <h3>{goal.inspiration}</h3>
                        </div>
                      </div>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(goal)}
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            
            <div className="content-layout">
              <div className="left-row">
                Add your career goals and what inspires you. This helps us
                tailor <br />
                recommendations, learning paths, and opportunities just for{" "}
                <br />
                you
              </div>
              <div className="right-row">
                <button onClick={handleAddNew}>Add Your Career Goals</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddCareerGoalModal
          onClose={() => setIsModalOpen(false)}
          onSave={fetchGoals} // refresh list after add/update
          editData={selectedGoal} // undefined for add, goal for edit
        />
      )}
    </section>
  );
}

export default CarrerGoals;
