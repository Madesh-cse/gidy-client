import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import axios from "axios";



export interface CertificateFormData {
  certificationName: string;
  provider: string;
  certificationUrl: string;
  certificationId: string;
  issuedDate: string;
  expiryDate: string;
  description: string;
}


export interface CertificateData extends CertificateFormData {
  _id: string;
}

export interface CertificateModalHandle {
  open: (data?: CertificateData) => void;
  close: () => void;
}

interface CertificateModalProps {
  onSave: (data: CertificateData) => void;
}


const AddCertificateModal = forwardRef<CertificateModalHandle,CertificateModalProps>(({ onSave }, ref) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const initialState: CertificateFormData = {
    certificationName: "",
    provider: "",
    certificationUrl: "",
    certificationId: "",
    issuedDate: "",
    expiryDate: "",
    description: "",
  };

  const [formData, setFormData] =
    useState<CertificateFormData>(initialState);

  const [editId, setEditId] = useState<string | null>(null);

    const API_URL = import.meta.env.VITE_API_URL;

  const open = (data?: CertificateData) => {
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


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!formData.certificationName || !formData.provider) {
        alert("Certification Name and Provider are required!");
        return;
      }

      let response;

      if (editId) {
        response = await axios.put(
          `${API_URL}/userProfile/certificate/update-certificate/${editId}`,
          formData
        );

        onSave(response.data.certificate);
      } else {
        response = await axios.post(
          `${API_URL}/userProfile/certificate/create`,
          formData
        );

        onSave(response.data.certificate);
      }

      close();
    } catch (err: any) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };


  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
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
          {editId
            ? "Edit Certification ✏️"
            : "Add Certification 📜"}
        </div>

        <form
          className="experience-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-group">
            <label>Certification Name *</label>
            <input
              type="text"
              name="certificationName"
              value={formData.certificationName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Provider *</label>
            <input
              type="text"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Certification URL</label>
            <input
              type="text"
              name="certificationUrl"
              value={formData.certificationUrl}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Certification ID</label>
            <input
              type="text"
              name="certificationId"
              value={formData.certificationId}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Issued Date</label>
              <input
                type="date"
                name="issuedDate"
                value={formData.issuedDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
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
});

export default AddCertificateModal;
