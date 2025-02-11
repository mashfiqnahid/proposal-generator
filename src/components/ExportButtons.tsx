import React, { useState } from "react";
import { Button, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { updateTitle, updateOverview, updateDeliverable, updateModule } from "../features/proposalSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import html2pdf from "html2pdf.js";

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

  const generateHTMLContentProjectTimeline = () => {
    // Constants
    const WORK_HOURS_PER_DAY = 8;
    const WORK_DAYS_PER_WEEK = 5;
    const WORK_HOURS_PER_WEEK = WORK_HOURS_PER_DAY * WORK_DAYS_PER_WEEK;

    // Compute workload per team role
    const teamWorkload = proposal.teamMembers.reduce((acc, member) => {
      acc[member.teamRole] = member.count * member.hoursPerDay * member.daysPerWeek;
      return acc;
    }, {} as Record<string, number>);

    // Compute module start and end weeks
    let currentWeek = 0;
    const moduleSchedule = proposal.modules.map((module) => {
      let maxWeeksNeeded = 0;

      module.hours.forEach(({ teamRole, hours }) => {
        const availableHoursPerWeek = teamWorkload[teamRole] || WORK_HOURS_PER_WEEK;
        const weeksNeeded = hours / availableHoursPerWeek;
        maxWeeksNeeded = Math.max(maxWeeksNeeded, weeksNeeded);
      });

      const fromWeek = currentWeek;
      const toWeek = currentWeek + maxWeeksNeeded;
      currentWeek = toWeek; // Move to the next available week after this module

      return { module: module.name, fromWeek: fromWeek.toFixed(1), toWeek: toWeek.toFixed(1) };
    });

    return `
        <h2>Project Timeline</h2>
        <table>
          <thead>
            <tr>
              <th>Module</th>
              <th>From Week</th>
              <th>To Week</th>
            </tr>
          </thead>
          <tbody>
            ${moduleSchedule.map(({ module, fromWeek, toWeek }) => `
              <tr>
                <td>${module}</td>
                <td>${fromWeek}</td>
                <td>${toWeek}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
    `;
  };
  const generateHTMLContentHoursSummary = () => {

    // Generate hour summary (Module X Team Role-wise distribution)
    const hourSummary: { [module: string]: { [teamRole: string]: number } } = {};
    const totalHours: { [teamRole: string]: number } = {};
    let grandTotalHours = 0;

    proposal.modules.forEach((module) => {
      hourSummary[module.name] = {};
      module.hours.forEach(({ teamRole, hours }) => {
        hourSummary[module.name][teamRole] = (hourSummary[module.name][teamRole] || 0) + hours;
        totalHours[teamRole] = (totalHours[teamRole] || 0) + hours;
        grandTotalHours += hours; // Sum up grand total hours
      });
    });

    // Get unique team roles for table headers
    const allTeamRoles = Array.from(new Set(proposal.modules.flatMap(module => module.hours.map(hour => hour.teamRole))));

    return `
        <h2>Hour Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Module</th>
              ${allTeamRoles.map(teamRole => `<th>${teamRole}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${Object.entries(hourSummary).map(([module, roles]) => `
              <tr>
                <td>${module}</td>
                ${allTeamRoles.map(teamRole => `<td>${roles[teamRole] || 0} h</td>`).join("")}
              </tr>
            `).join("")}
            <tr>
              <td><strong>Total Hours</strong></td>
              ${allTeamRoles.map(teamRole => `<td><strong>${totalHours[teamRole] || 0} h</strong></td>`).join("")}
            </tr>
          </tbody>
        </table>
        <h3>Total Hours: ${grandTotalHours} h</h3>
    `;
  };

  const generateHTMLContent = () => {
    // Generate hour summary (Module X Team Role-wise distribution)
    const hourSummary: { [module: string]: { [teamRole: string]: number } } = {};
    const totalHours: { [teamRole: string]: number } = {};

    proposal.modules.forEach((module) => {
      hourSummary[module.name] = {};
      module.hours.forEach(({ teamRole, hours }) => {
        hourSummary[module.name][teamRole] = (hourSummary[module.name][teamRole] || 0) + hours;
        totalHours[teamRole] = (totalHours[teamRole] || 0) + hours;
      });
    });
    return `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; max-width: 900px; margin: auto; background-color: #f4f4f4; }
          h1 { color: #2c3e50; text-align: center; }
          h2 { color: #34495e; border-bottom: 2px solid #ddd; padding-bottom: 5px; }
          p, li { font-size: 16px; line-height: 1.6; color: #333; }
          ul { padding-left: 20px; }
          .module, .team-member { background: #fff; padding: 10px; margin: 10px 0; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
          .module h3, .team-member h3 { margin-bottom: 5px; color: #2c3e50; }
          .module p, .team-member p { margin: 5px 0; }
          .hours { font-weight: bold; color: #e67e22; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; text-align: center; }
          .timeline-table { margin-top: 20px; }
          .timeline-table th, .timeline-table td { text-align: center; font-size: 14px; }
          .highlight { background-color: #eafaf1; color: #2c3e50; font-weight: bold; }
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
  
        <h2>Team Members</h2>
        <table>
          <thead>
            <tr>
              <th>Team Role</th>
              <th>Required Members</th>
              <th>Days Per Week</th>
              <th>Hours Per Day</th>
            </tr>
          </thead>
          <tbody>
            ${proposal.teamMembers.map(member => `
              <tr>
                <td>${member.teamRole}</td>
                <td>${member.count}</td>
                <td>${member.daysPerWeek}</td>
                <td>${member.hoursPerDay}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
  
  
       ${generateHTMLContentHoursSummary()}
       ${generateHTMLContentProjectTimeline()}
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

  const exportAsPDF = () => {
    const element = document.createElement("div");
    element.innerHTML = generateHTMLContent();
    document.body.appendChild(element);

    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: "proposal.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4", orientation: "portrait" },
      })
      .save()
      .finally(() => {
        document.body.removeChild(element);
      });
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
      <Button type="primary" onClick={exportAsPDF} style={{ marginRight: 10 }}>
        Export as PDF
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
