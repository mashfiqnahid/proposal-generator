import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import HourInput from './HourInput';
import { ProjectModule } from '../../types/proposal.type';

interface ModuleFormProps {
    visible: boolean;
    initialData: ProjectModule;
    onSave: (data: ProjectModule) => void;
    onCancel: () => void;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ visible, initialData, onSave, onCancel }) => {
    const [form] = Form.useForm(); // Create the form instance

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                ...initialData,
                hours: initialData.hours.length ? initialData.hours : [{ teamRole: '', hours: 0 }],
            });
        }
    }, [visible, initialData, form]);

    const handleSave = () => {
        form.validateFields().then((values) => {
            onSave(values);
            form.resetFields();
        });
    };

    return (
        <Modal title={initialData?.name ? 'Edit ProjectModule' : 'Add New ProjectModule'} open={visible} onOk={handleSave} onCancel={onCancel}>
            <Form form={form} layout="vertical">
                <Form.Item label="ProjectModule Name" name="name" rules={[{ required: true, message: 'Please enter module name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter description' }]}>
                    <Input.TextArea />
                </Form.Item>
                {/* Pass form instance to HourInput */}
                <HourInput form={form} />
            </Form>
        </Modal>
    );
};

export default ModuleForm;
