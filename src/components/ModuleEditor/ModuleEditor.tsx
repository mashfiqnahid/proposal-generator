import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModuleTable from './ModuleTable';
import ModuleForm from './ModuleForm';
import { blankModule, updateModules } from '../../features/proposalSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';

const ModuleEditor: React.FC = () => {
    const dispatch = useAppDispatch();
    const modules = useAppSelector((state:RootState) => state.proposal.modules);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [currentModule, setCurrentModule] = useState(blankModule);

    // Open Modal for Add or Edit
    const showModal = (index: number | null = null) => {
        setEditIndex(index);
        setCurrentModule(index !== null ? modules[index] : blankModule);
        setIsModalVisible(true);
    };

    // Handle Save (Add or Edit)
    const handleSave = (data: any) => {
        const updatedModules = [...modules];
        if (editIndex !== null) {
            updatedModules[editIndex] = data;
        } else {
            updatedModules.push(data);
        }
        dispatch(updateModules(updatedModules));
        setIsModalVisible(false);
    };

    // Handle Delete
    const handleDelete = (index: number) => {
        const updatedModules = modules.filter((_, i) => i !== index);
        dispatch(updateModules(updatedModules));
    };

    return (
        <div>
            <h3>Modules</h3>
            <ModuleTable modules={modules} onEdit={showModal} onDelete={handleDelete} />
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)} style={{ marginTop: 16 }}>
                Add Module
            </Button>
            {isModalVisible && <ModuleForm visible={isModalVisible} initialData={currentModule} onSave={handleSave} onCancel={() => setIsModalVisible(false)} />}
        </div>
    );
};

export default ModuleEditor;
