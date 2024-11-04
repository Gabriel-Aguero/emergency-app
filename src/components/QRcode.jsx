import { useRef } from "react";
import QRCode from "react-qr-code";
import QRCodeSVG from "react-qr-code";

const QRcode = () => {
  // URL del sitio web
  const url = "https://www.google.com";

  const downloadQRCode = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Convierte el canvas en un archivo PNG y crea el enlace de descarga
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    // Convierte el SVG a formato de imagen
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Renderiza el código QR en formato SVG */}
      <QRCodeSVG id="QRCode" value={url} />
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
