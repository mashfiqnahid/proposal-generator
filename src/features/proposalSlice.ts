import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Proposal, { ProjectModule, TeamMembers } from '../types/proposal.type';

export const blankModule: ProjectModule = {
  name: '',
  description: '',
  hours: [],
};

const initialState: Proposal = {
  title: 'Project Proposal: RoundCube CRM',
  overview: 'RoundCube CRM is a SaaS-based CRM platform designed to enhance business processes.',
  deliverables: ['Dashboard', 'Contacts Module', 'Leads Module', 'Accounts Module'],
  modules: [
    {
      name: 'Dashboard Module',
      description: 'Summarized metrics, dynamic charts, and team activity feed.',
      hours: [
        { teamRole: "Frontend", hours: 50 },
        { teamRole: "Backend", hours: 40 },
        { teamRole: "UI/UX", hours: 30 },
        { teamRole: "Planning", hours: 10 },
      ],
    },
  ],
  teamMembers: [
    { teamRole: "Frontend", count: 1, daysPerWeek: 5, hoursPerDay: 7 },
    { teamRole: "Backend", count: 1, daysPerWeek: 5, hoursPerDay: 7 },
    { teamRole: "UI/UX", count: 1, daysPerWeek: 5, hoursPerDay: 7 },
    { teamRole: "Planning", count: 1, daysPerWeek: 5, hoursPerDay: 7 },
  ],
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
    updateModules: (state, action: PayloadAction<ProjectModule[]>) => {
      state.modules = action.payload;
    },
    updateTeamMembers: (state, action: PayloadAction<TeamMembers[]>) => {
      state.teamMembers = action.payload;
    },
  },
});

export const { updateTitle, updateOverview, updateDeliverable, updateModule, updateModules, updateTeamMembers } = proposalSlice.actions;

export default proposalSlice.reducer;
