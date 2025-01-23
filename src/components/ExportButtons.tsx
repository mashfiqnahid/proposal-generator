import React from "react";
import { updateTitle, updateOverview, updateDeliverable, updateModule } from "../features/proposalSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const ExportButtons: React.FC = () => {
  const dispatch = useAppDispatch();
  const proposal = useAppSelector((state) => state.proposal);


  // Function to handle file import
  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

          alert("JSON imported successfully!");
        } catch (error) {
          alert("Error parsing JSON. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
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

  const exportAsHTML = () => {
    const htmlContent = `
      <html>
      <body>
        <h1>${proposal.title}</h1>
        <p>${proposal.overview}</p>
      </body>
      </html>
    `;
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
      <button onClick={exportAsJSON}>Export as JSON</button>
      <button onClick={exportAsHTML}>Export as HTML</button>
      <input
        type="file"
        accept=".json"
        onChange={handleImportJSON}
        style={{ display: "block", marginTop: "10px" }}
      />
    </div>
  );
};

export default ExportButtons;
