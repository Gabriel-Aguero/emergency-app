import React, { useRef } from "react";
import QRCode from "react-qr-code";

const QRcode = () => {
  const qrRef = useRef();

  // Cambia esta URL por la de tu sitio web
  const url = "https://www.google.com";

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center">
      <QRCode
        value={url}
        size={200}
        level="H"
        includeMargin={true}
        ref={qrRef}
      />
      <button
        onClick={downloadQRCode}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Descargar Código QR
      </button>
    </div>
  );
};

export default QRcode;
