import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import HourInput from './HourInput';
import { ProjectModule } from '../../types/proposal.type';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

interface ModuleFormProps {
    visible: boolean;
    initialData: ProjectModule;
    onSave: (data: ProjectModule) => void;
    onCancel: () => void;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ visible, initialData, onSave, onCancel }) => {
    const [form] = Form.useForm(); // Create the form instance
    const { description } = initialData

    // Initialize Tiptap editor for the description field
    const descriptionEditor = useEditor({
        extensions: [StarterKit],
        content: description,
        onUpdate: ({ editor }) => {
            form.setFieldsValue({
                description: editor.getHTML(), // Update the form value with editor content
            });
        },
    }, [description]);

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
            onSave(values); // Pass form values (including description HTML) to onSave
            form.resetFields();
        });
    };

    return (
        <Modal title={initialData?.name ? 'Edit Project Module' : 'Add New Project Module'} open={visible} onOk={handleSave} onCancel={onCancel}>
            <Form form={form} layout="vertical">
                <Form.Item label="Project Module Name" name="name" rules={[{ required: true, message: 'Please enter module name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter description' }]}>
                    <EditorContent editor={descriptionEditor} />
                </Form.Item>
                {/* Pass form instance to HourInput */}
                <HourInput form={form} />
            </Form>
        </Modal>
    );
};

export default ModuleForm;
