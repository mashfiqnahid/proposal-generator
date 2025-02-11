import React, { useState } from "react";
import { Button, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { updateTitle, updateOverview, updateDeliverable, updateModule } from "../features/proposalSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const ExportButtons: React.FC = () => {
  const dispatch = useAppDispatch();
  const proposal = useAppSelector((state) => state.proposal);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Function to handle file import
  const handleImportJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);

        // Update Redux state with imported data
        if (data.title) dispatch(updateTitle(data.title));
        if (data.overview) dispatch(updateOverview(data.overview));
        if (data.deliverables) {
          data.deliverables.forEach((deliverable: string, index: number) => {
            dispatch(updateDeliverable({ index, value: deliverable }));
          });
        }
        if (data.modules) {
          data.modules.forEach((module: any, index: number) => {
            dispatch(updateModule({ index, module }));
          });
        }

        message.success("JSON imported successfully!");
      } catch (error) {
        message.error("Error parsing JSON. Please check the file format.");
      }
    };
    reader.readAsText(file);
  };

  const exportAsJSON = () => {
    const blob = new Blob([JSON.stringify(proposal, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "proposal.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateHTMLContent = () => {
    return `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: auto; background-color: #f4f4f4; }
          h1 { color: #2c3e50; text-align: center; }
          h2 { color: #34495e; border-bottom: 2px solid #ddd; padding-bottom: 5px; }
          p, li { font-size: 16px; line-height: 1.6; color: #333; }
          ul { padding-left: 20px; }
          .module { background: #fff; padding: 10px; margin: 10px 0; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
          .module h3 { margin-bottom: 5px; color: #2c3e50; }
          .module p { margin: 5px 0; }
          .hours { font-weight: bold; color: #e67e22; }
        </style>
      </head>
      <body>
        <h1>${proposal.title}</h1>
        <p>${proposal.overview}</p>

        <h2>Deliverables</h2>
        <ul>
          ${proposal.deliverables.map(deliverable => `<li>${deliverable}</li>`).join("")}
        </ul>

        <h2>Modules</h2>
        ${proposal.modules.map(module => `
          <div class="module">
            <h3>${module.name}</h3>
            <p>${module.description}</p>
            <p class="hours">Hours:</p>
            <ul>
              ${module.hours.map(hour => `<li>${hour.teamRole}: ${hour.hours} hours</li>`).join("")}
            </ul>
          </div>
        `).join("")}

      </body>
      </html>
    `;
  };

  const exportAsHTML = () => {
    const htmlContent = generateHTMLContent();
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "proposal.html";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>

      <Upload
        accept=".json"
        showUploadList={false}
        beforeUpload={(file) => {
          handleImportJSON(file);
          return false; // Prevent automatic upload
        }}
      >
        <Button icon={<UploadOutlined />} style={{ marginTop: "10px" }}>
          Import JSON
        </Button>
      </Upload>

      <Button type="primary" onClick={exportAsJSON} style={{ marginRight: 10 }}>
        Export as JSON
      </Button>
      <Button type="primary" onClick={exportAsHTML} style={{ marginRight: 10 }}>
        Export as HTML
      </Button>
      <Button type="default" onClick={() => setIsPreviewOpen(true)} style={{ marginRight: 10 }}>
        Preview
      </Button>

      <Modal
        title="Proposal Preview"
        open={isPreviewOpen}
        onCancel={() => setIsPreviewOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsPreviewOpen(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        <div
          style={{ maxHeight: "70vh", overflowY: "auto", padding: "10px", background: "#fff" }}
          dangerouslySetInnerHTML={{ __html: generateHTMLContent() }}
        />
      </Modal>
    </div>
  );
};

export default ExportButtons;
