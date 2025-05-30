import React from 'react';
import { Table, InputNumber } from 'antd';
import { useAppDispatch } from '../../store/hooks';
import { updateTeamMembers } from '../../features/proposalSlice';
import { TeamMembers } from '../../types/proposal.type';

interface TeamMemberTableProps {
    teamMembers: TeamMembers[];
}

const TeamMemberTable: React.FC<TeamMemberTableProps> = ({ teamMembers }) => {
    const dispatch = useAppDispatch();

    const handleUpdate = (index: number, key: keyof TeamMembers, value: number) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index] = { ...updatedMembers[index], [key]: value };
        dispatch(updateTeamMembers(updatedMembers));
    };

    const columns = [
        { title: 'Team Role', dataIndex: 'teamRole', key: 'teamRole' },
        {
            title: 'Required Members',
            dataIndex: 'count',
            key: 'count',
            render: (text: number, record: TeamMembers, index: number) => (
                <InputNumber
                    min={1}
                    value={text}
                    onChange={(value) => handleUpdate(index, 'count', value || 1)}
                />
            ),
        },
        {
            title: 'Days Per Week',
            dataIndex: 'daysPerWeek',
            key: 'daysPerWeek',
            render: (text: number, record: TeamMembers, index: number) => (
                <InputNumber
                    min={1} max={7}
                    value={text}
                    onChange={(value) => handleUpdate(index, 'daysPerWeek', value || 1)}
                />
            ),
        },
        {
            title: 'Hours Per Day',
            dataIndex: 'hoursPerDay',
            key: 'hoursPerDay',
            render: (text: number, record: TeamMembers, index: number) => (
                <InputNumber
                    min={1} max={12}
                    value={text}
                    onChange={(value) => handleUpdate(index, 'hoursPerDay', value || 1)}
                />
            ),
        },
    ];

    return <Table className='custom-dark-table' dataSource={teamMembers.map((tm, index) => ({ ...tm, key: index }))} columns={columns} pagination={false} />;
};

export default TeamMemberTable;
