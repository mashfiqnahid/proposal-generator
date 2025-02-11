import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Form, FormInstance } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Hour } from '../../types/proposal.type';

interface HourInputProps {
    form: FormInstance;
}

const HourInput: React.FC<HourInputProps> = ({ form }) => {
    const [hours, setHours] = useState<Hour[]>([])
    useEffect(() => {
        const updatedHours = form.getFieldValue('hours') || [];
        setHours(updatedHours)
    }, [])
    const handleAddHour = () => {
        const updatedHours = [...hours, { label: '', hours: 0 }];
        form.setFieldsValue({ hours: updatedHours });
        setHours(updatedHours)
    };

    const handleUpdateHour = (index: number, key: 'label' | 'hours', value: string | number) => {
        const updatedHours = [...hours];
        updatedHours[index] = { ...updatedHours[index], [key]: key === 'hours' ? Number(value) : value };
        form.setFieldsValue({ hours: updatedHours });
        setHours(updatedHours)
    };

    const handleDeleteHour = (index: number) => {
        const updatedHours = hours.filter((_, i) => i !== index);
        form.setFieldsValue({ hours: updatedHours });
        setHours(updatedHours)
    };

    return (
        <Form.Item label="Hours" name="hours">
            {hours.map((h, index) => (
                <Space key={index} style={{ display: 'flex', marginBottom: 8 }}>
                    <Input
                        placeholder="Label (e.g., Frontend)"
                        value={h.label}
                        onChange={(e) => handleUpdateHour(index, 'label', e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Hours"
                        value={h.hours}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*\.?\d*$/.test(value)) { // Allows only numbers and decimals
                                handleUpdateHour(index, 'hours', value ? parseFloat(value) : 0);
                            }
                        }}
                    />
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteHour(index)} />
                </Space>
            ))}
            <Button type="dashed" onClick={handleAddHour} icon={<PlusOutlined />} style={{ marginTop: 8 }}>
                Add Hour Entry
            </Button>
        </Form.Item>
    );
};

export default HourInput;
