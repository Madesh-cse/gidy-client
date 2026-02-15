import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import "../../styles/components/main/_exprience-model.scss";
import axios from "axios";

export interface ExperienceFormData {
  role: string;
  company: string;
  location: string;
  joinDate: string;
  leaveDate: string;
  currentlyWorking: boolean;
}

export interface ExperienceData extends ExperienceFormData {
  _id: string;
}

export interface ExperienceModalHandle {
  open: (data?: ExperienceData) => void;
  close: () => void;
}

interface ExperienceModalProps {
  onSave: (data: ExperienceData) => void;
}

const ExperienceModal = forwardRef<ExperienceModalHandle, ExperienceModalProps>(
  ({ onSave }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const initialState: ExperienceFormData = {
      role: "",
      company: "",
      location: "",
      joinDate: "",
      leaveDate: "",
      currentlyWorking: false,
    };

    const [formData, setFormData] = useState<ExperienceFormData>(initialState);

    const [editId, setEditId] = useState<string | null>(null);

      const API_URL = process.env.REACT_APP_API_URL;

    const open = (data?: ExperienceData) => {
      if (data) {
        const { _id, ...rest } = data;
        setFormData(rest);
        setEditId(_id);
      } else {
        setFormData(initialState);
        setEditId(null);
      }

      modalRef.current?.classList.add("show");
    };

    const close = () => {
      modalRef.current?.classList.remove("show");
      setFormData(initialState);
      setEditId(null);
    };

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    const handleSave = async () => {
      try {
        if (!formData.role || !formData.company) {
          alert("Role and Company are required!");
          return;
        }

        let response;

        if (editId) {
          response = await axios.put(
            `${API_URL}/userProfile/exp/update/${editId}`,
            formData,
          );

          onSave(response.data.updated);
        } else {
          response = await axios.post(
            `${API_URL}/userProfile/exp/create`,
            formData,
          );

          onSave(response.data.exprience);
        }

        close();
      } catch (err: any) {
        console.error(err);
        alert(err.response?.data?.message || "Something went wrong");
      }
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === modalRef.current) {
        close();
      }
    };

    return (
      <div
        ref={modalRef}
        className="experience-modal"
        onClick={handleOverlayClick}
      >
        <div
          className="experience-modal-box"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="experience-header">
            {editId ? "Edit Experience ✏️" : "Add Experience 💼"}
          </div>

          <form
            className="experience-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-group">
              <label>Role *</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                />
              </div>

              {!formData.currentlyWorking && (
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="leaveDate"
                    value={formData.leaveDate}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                name="currentlyWorking"
                checked={formData.currentlyWorking}
                onChange={handleChange}
              />
              Currently working in this role
            </div>
          </form>

          <div className="experience-footer">
            <button type="button" onClick={close}>
              Cancel
            </button>
            <button type="button" onClick={handleSave}>
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default ExperienceModal;
