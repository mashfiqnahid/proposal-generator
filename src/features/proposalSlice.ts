import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Proposal, { ProjectModule } from '../types/proposal.type';

export const blankModule: ProjectModule = {
  name: '',
  description: '',
  hours: [],
}
const initialState: Proposal = {
  title: 'Project Proposal: ConnectClub CRM',
  overview: 'ConnectClub CRM is a SaaS-based CRM platform designed to enhance business processes.',
  deliverables: ['Dashboard', 'Contacts ProjectModule', 'Leads ProjectModule', 'Accounts ProjectModule'],
  modules: [
    {
      name: 'Dashboard ProjectModule',
      description: 'Summarized metrics, dynamic charts, and team activity feed.',
      hours: [{ teamRole: "Frontend", hours: 50 }, { teamRole: "Backend", hours: 40 }, { teamRole: "uiux", hours: 30 }, { teamRole: "Planning", hours: 10 }],
    },
  ],
  teamMembers:[]
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
    updateDeliverable: (state, action: PayloadAction<{ index: number; value: string }>) => {
      state.deliverables[action.payload.index] = action.payload.value;
    },
    updateModule: (state, action: PayloadAction<{ index: number; module: ProjectModule }>) => {
      state.modules[action.payload.index] = action.payload.module;
    },
    updateDeliverables: (state, action: PayloadAction<string[]>) => {
      state.deliverables = action.payload;
    },
    updateModules: (state, action: PayloadAction<ProjectModule[]>) => {
      state.modules = action.payload;
    }
  },
});

export const {
  updateTitle,
  updateOverview,
  updateDeliverable,
  updateModule, updateDeliverables, updateModules
} = proposalSlice.actions;

export default proposalSlice.reducer;
