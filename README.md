# **Proposal Generator**

A React-based proposal generator application built with **TypeScript**, **Redux**, and **SCSS**. This app allows users to create project proposals with editable modules, timelines, and deliverables. The app also includes export options for downloading the proposal as JSON or HTML.

---

## **Features**

- **Title Editor**: Update the project proposal title.
- **Proposal Overview**: Modify the project overview.
- **Deliverables**: Edit the list of deliverables for the project.
- **Module Editor**: Customize project modules with descriptions and estimated hours.
- **Export Options**: Download the proposal in JSON or HTML format.

---

## **Technologies Used**

- **React**: Frontend framework for building the user interface.
- **TypeScript**: Ensures type safety throughout the application.
- **Redux Toolkit**: Manages the application state.
- **SCSS**: Provides enhanced styling capabilities.
- **Yarn**: Package manager for dependency management.

---

## **Getting Started**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/proposal-generator.git
cd proposal-generator
```

### **2. Install Dependencies**
```bash
yarn install
```

### **3. Start the Development Server**
```bash
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## **Project Structure**

```
src/
├── components/             # Reusable UI components
│   ├── Deliverables.tsx    # Component for editing deliverables
│   ├── ModuleEditor.tsx    # Component for managing project modules
│   ├── ProposalOverview.tsx # Component for editing the project overview
│   ├── TimelineEditor.tsx  # (Optional) Add/edit project timelines
│   ├── TitleEditor.tsx     # Component for updating the proposal title
│   └── ExportButtons.tsx   # Export options for proposal
├── features/
│   └── proposalSlice.ts    # Redux slice for proposal state
├── store/
│   └── store.ts            # Redux store configuration
├── App.tsx                 # Main application component
├── App.scss                # Global styles
└── index.tsx               # Application entry point
```

---

## **Key Commands**

### **Run the Development Server**
```bash
yarn start
```

### **Build the Project**
```bash
yarn build
```

### **Lint and Format Code**
```bash
yarn lint
yarn format
```

---

## **How to Use**

1. **Edit Title**: Use the Title Editor to set the project proposal title.
2. **Modify Overview**: Use the Proposal Overview editor to write or update the project summary.
3. **Update Deliverables**: Add, remove, or edit project deliverables in the Deliverables component.
4. **Customize Modules**: Define project modules, descriptions, and estimated hours using the Module Editor.
5. **Export Proposal**: Download the completed proposal as either JSON or HTML for sharing or archiving.

---

## **Example Proposal**

Here’s an example of what a proposal might look like:

### **Title**: 
`Project Proposal: ConnectClub CRM`

### **Overview**: 
`ConnectClub CRM is a SaaS-based CRM platform designed to enhance business processes.`

### **Deliverables**:
- Dashboard
- Contacts Module
- Leads Module
- Accounts Module

### **Modules**:
1. **Dashboard Module**  
   Description: Summarized metrics, dynamic charts, and team activity feed.  
   Estimated Hours:  
   - Frontend: 50  
   - Backend: 40  
   - UI/UX: 30  
   - Planning: 10  

---

## **Export Options**

1. **JSON Export**: Downloads the full proposal data in JSON format for integration with other tools.
2. **HTML Export**: Generates a styled HTML document for presentation or printing.

---

## **Contributing**

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/new-feature
   ```
5. Open a Pull Request.

---

## **License**

This project is licensed under the MIT License. Feel free to use, modify, and distribute this project as needed.

---

## **Acknowledgments**

Thank you to the React, Redux Toolkit, and SCSS communities for their fantastic tools and documentation!

---

### **Contact**

For any questions or suggestions, feel free to reach out:
- **Email**: mashfiqnahid@gmail.com
- **GitHub**: [mashfiqnahid](https://github.com/mashfiqnahid)