import { BsThreeDotsVertical } from "react-icons/bs";
import { GoPlusCircle } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import AddCertificateModal from "../Model/AddCertificateModel";
import type { CertificateModalHandle } from "../Model/AddCertificateModel";
import type { CertificateData } from "../Model/AddCertificateModel";
import "../../styles/components/main/_display-content.scss";
import { BiCertification } from "react-icons/bi";


function CertificationDisplay() {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const modalRef = useRef<CertificateModalHandle>(null);

  const API_URL =  import.meta.env.VITE_API_URL;; 

  const fetchCertificates = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/userProfile/certificate/fetch`,
      );
      setCertificates(res.data?.data || []);
    } catch (error) {
      console.error(error);
      setCertificates([]);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleOpen = () => {
    modalRef.current?.open();
  };

  const handleEdit = (cert: CertificateData) => {
    modalRef.current?.open(cert);
    setActiveDropdown(null);
  };

  const handleSave = (savedCert: CertificateData) => {
    setCertificates((prev) => {
      const exists = prev.find((c) => c._id === savedCert._id);

      if (exists) {
        return prev.map((c) => (c._id === savedCert._id ? savedCert : c));
      }

      return [savedCert, ...prev];
    });
  };

  return (
    <>
      <div className="Exprience-container">
        <div className="exprience-card">
          <div className="flex-layout">
            <h4>Certifications</h4>
            <div className="model-btn" onClick={handleOpen}>
              <GoPlusCircle />
            </div>
          </div>

          {certificates.length === 0 && (
            <p className="default-exp-text">No certifications added yet.</p>
          )}

          {certificates.map((cert) => (
            <div key={cert._id} className="experience-item">
              <div className="exp-left">
                <div className="exp-content">
                  <div className="exp-img">
                    <BiCertification/>
                  </div>
                  <div className="exp-info">
                    <h5>{cert.certificationName}</h5>
                    <p>{cert.provider}</p>
                    <p>{cert.description}</p>
                    <p>ID:{cert.certificationId}</p>
                    <span className="date">
                      {cert.issuedDate}
                      {cert.expiryDate && ` - ${cert.expiryDate}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="dropdown-wrapper">
                <BsThreeDotsVertical onClick={() => toggleDropdown(cert._id)} />

                {activeDropdown === cert._id && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleEdit(cert)}>Edit</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddCertificateModal ref={modalRef} onSave={handleSave} />
    </>
  );
}

export default CertificationDisplay;
