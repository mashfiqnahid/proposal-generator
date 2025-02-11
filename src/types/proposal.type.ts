
export interface Hour {
    label: string;
    hours: number;
}

export interface Module {
    name: string;
    description: string;
    hours: Hour[];
}

interface Proposal {
    title: string;
    overview: string;
    deliverables: string[];
    modules: Module[];
    timeline: string;
}
export default Proposal