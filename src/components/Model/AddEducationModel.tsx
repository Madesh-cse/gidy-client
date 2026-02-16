import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import axios from "axios";
import "../../styles/components/main/_display-content.scss";

export interface EducationData {
  _id: string;
  college: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate?: string;
  currentlyStudying: boolean;
}

export interface EducationModalRef {
  open: (data?: EducationData) => void;
  close: () => void;
}

interface Props {
  onSave: (data: EducationData) => void;
}

const EducationModal = forwardRef<EducationModalRef, Props>(
  ({ onSave }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const initialState = {
      college: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      currentlyStudying: false,
    };

    const [formData, setFormData] = useState(initialState);

    const [editId, setEditId] = useState<string | null>(null);

     const API_URL =  import.meta.env.VITE_API_URL;

    const open = (data?: EducationData) => {
      if (data) {
        setFormData({
          college: data.college,
          degree: data.degree,
          fieldOfStudy: data.fieldOfStudy,
          location: data.location,
          startDate: data.startDate?.slice(0, 10),
          endDate: data.endDate?.slice(0, 10) || "",
          currentlyStudying: data.currentlyStudying,
        });
        setEditId(data._id);
      } else {
        setFormData(initialState);
        setEditId(null);
      }

      modalRef.current?.classList.add("show");
    };

    const close = () => {
      modalRef.current?.classList.remove("show");
    };

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const { name, value, type, checked } = e.target as HTMLInputElement;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    const handleSave = async () => {
      try {
        let response;

        if (editId) {
          response = await axios.put(
            `${API_URL}/userProfile/edu/update/${editId}`,
            formData,
          );
        } else {
          response = await axios.post(
            `${API_URL}/userProfile/edu/create`,
            formData,
          );
        }

        onSave(response.data.education);

        close();
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div ref={modalRef} className="experience-modal">
        <div className="experience-modal-box">
          <div className="experience-header">
            {editId ? "Edit Education ✏️" : "Add Education 🎓"}
          </div>
          <form
            className="experience-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-group">
              <label>College *</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Field of Study</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
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
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  disabled={formData.currentlyStudying}
                  onChange={handleChange}
                />
              </div>
            </div>
            <label className="checkbox-group">
              <input
                type="checkbox"
                name="currentlyStudying"
                checked={formData.currentlyStudying}
                onChange={handleChange}
              />
              Currently studying here
            </label>
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

export default EducationModal;
