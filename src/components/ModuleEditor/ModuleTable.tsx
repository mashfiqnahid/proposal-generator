import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ProjectModule } from '../../types/proposal.type';
import { current } from '@reduxjs/toolkit';

interface ModuleTableProps {
    modules: ProjectModule[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}

const ModuleTable: React.FC<ModuleTableProps> = ({ modules, onEdit, onDelete }) => {
    const columns = [
        { title: 'ProjectModule Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Hours',
            dataIndex: 'hours',
            key: 'hours',
            render: (hours: { teamRole: string; hours: number }[]) =>
                hours.reduce((prev, cur) => (prev + cur.hours), 0)+" Hrs",
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any, index: number) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => onEdit(index)} />
                    <Popconfirm
                        title="Are you sure to delete this module?"
                        onConfirm={() => onDelete(index)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return <Table dataSource={modules.map((mod, index) => ({ ...mod, key: index }))} columns={columns} pagination={false} />;
};

export default ModuleTable;
