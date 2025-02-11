import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { updateTeamMembers } from '../../features/proposalSlice';
import TeamMemberTable from './TeamMemberTable';
import { TeamMembers } from '../../types/proposal.type';

const DEFAULT_HOURS_PER_DAY = 8;
const DEFAULT_DAYS_PER_WEEK = 5;

const TeamMemberEditor: React.FC = () => {
    const dispatch = useAppDispatch();
    const modules = useAppSelector((state: RootState) => state.proposal.modules);
    const teamMembers = useAppSelector((state: RootState) => state.proposal.teamMembers);

    // Extract unique team roles from modules
    const extractedRoles = useMemo(() => {
        const rolesSet = new Set<string>();
        modules.forEach((module) => {
            module.hours.forEach(({ teamRole }) => rolesSet.add(teamRole));
        });
        return Array.from(rolesSet);
    }, [modules]);

    // Sync teamRoles with Redux store
    useEffect(() => {
        const updatedTeamMembers: TeamMembers[] = extractedRoles.map((role) => {
            const existingMember = teamMembers.find((tm) => tm.teamRole === role);
            return existingMember || {
                teamRole: role,
                count: 1,
                daysPerWeek: DEFAULT_DAYS_PER_WEEK,
                hoursPerDay: DEFAULT_HOURS_PER_DAY,
            };
        });
        dispatch(updateTeamMembers(updatedTeamMembers));
    }, [extractedRoles]);

    return (
        <div>
            <h3>Team Members</h3>
            <TeamMemberTable teamMembers={teamMembers} />
        </div>
    );
};

export default TeamMemberEditor;
