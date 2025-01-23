import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Hours {
  label: string;
  hours: number;
}

interface Module {
  name: string;
  description: string;
  hours: Hours[];
}

interface ProposalState {
  title: string;
  overview: string;
  deliverables: string[];
  modules: Module[];
  timeline: string;
}

const initialState: ProposalState = {
  title: 'Project Proposal: ConnectClub CRM',
  overview: 'ConnectClub CRM is a SaaS-based CRM platform designed to enhance business processes.',
  deliverables: ['Dashboard', 'Contacts Module', 'Leads Module', 'Accounts Module'],
  modules: [
    {
      name: 'Dashboard Module',
      description: 'Summarized metrics, dynamic charts, and team activity feed.',
      hours: [{ label: "Frontend", hours: 50 }, { label: "Backend", hours: 40 }, { label: "uiux", hours: 30 }, { label: "Planning", hours: 10 }],
    },
  ],
  timeline: 'Phase 1: Dashboard (Weeks 1-2)\nPhase 2: Contacts & Leads (Weeks 3-5)',
};

export const proposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateOverview: (state, action: PayloadAction<string>) => {
      state.overview = action.payload;
    },
    updateTimeline: (state, action: PayloadAction<string>) => {
      state.timeline = action.payload;
    },
    updateDeliverable: (state, action: PayloadAction<{ index: number; value: string }>) => {
      state.deliverables[action.payload.index] = action.payload.value;
    },
    updateModule: (state, action: PayloadAction<{ index: number; module: Module }>) => {
      state.modules[action.payload.index] = action.payload.module;
    },
    updateDeliverables: (state, action: PayloadAction<string[]>) => {
      state.deliverables = action.payload;
    },
    updateModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    }
  },
});

export const {
  updateTitle,
  updateOverview,
  updateTimeline,
  updateDeliverable,
  updateModule, updateDeliverables, updateModules
} = proposalSlice.actions;

export default proposalSlice.reducer;
