import Image from "next/image";

export default function ImageModal({ show, image, onClose }) {
  if (!show) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        className="modal-box"
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={{ float: "right", cursor: "pointer" }}
          onClick={onClose}
        >
          ✖
        </button>

        <Image
          src={image}
          alt="modal-img"
          width={700}
          height={700}
          className="img-fluid"
        />
      </div>
    </div>
  );
}
