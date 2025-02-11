
export interface Hour {
    teamRole: string;
    hours: number;
}
export interface TeamMembers {
    teamRole: string;
    count: number;
    daysPerWeek: number;
    hoursPerDay: number;
}

export interface ProjectModule {
    name: string;
    description: string;
    hours: Hour[];
}

interface Proposal {
    title: string;
    overview: string;
    deliverables: string[];
    modules: ProjectModule[];
    teamMembers: TeamMembers[];
}
export default Proposal