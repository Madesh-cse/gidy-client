import { GoPlusCircle } from "react-icons/go";
import { useRef } from "react";
import AddCertificateModal from "../Model/AddCertificateModel";
import type { CertificateModalHandle } from "../Model/AddCertificateModel";

function UploadCerificate() {
  const modalRef =
    useRef<CertificateModalHandle>(null);

  const handleSave = (data: any) => {
    console.log("Certificate Data:", data);
  };

  return (
    <>
      <div className="add-section-container">
        <div className="add-section-box">
          <div className="content-flex">
            <div className="description">
              <div className="content-title">
                Upload Your Certificates 📜
                <span>(+20%)</span>
              </div>
              <div className="content-para">
                Boost your profile with relevant certifications and training.
              </div>
            </div>

            <div
              className="model-btn"
              onClick={() => modalRef.current?.open()}
            >
              <GoPlusCircle />
            </div>
          </div>
        </div>
      </div>

      <AddCertificateModal
        ref={modalRef}
        onSave={handleSave}
      />
    </>
  );
}

export default UploadCerificate;
