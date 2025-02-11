import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Module } from '../../types/proposal.type';

interface ModuleTableProps {
    modules: Module[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}

const ModuleTable: React.FC<ModuleTableProps> = ({ modules, onEdit, onDelete }) => {
    const columns = [
        { title: 'Module Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Hours',
            dataIndex: 'hours',
            key: 'hours',
            render: (hours: { label: string; hours: number }[]) =>
                hours.map((h) => `${h.label}: ${h.hours}`).join(', '),
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
