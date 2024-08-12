import React from 'react';
import { Form, Input, Button, DatePicker, Col, Row, Modal } from 'antd';
import { BlogPost } from "../models/BlogPost";

const { confirm } = Modal;

interface BlogFormProps {
    initialValues?: BlogPost;
    action: 'add' | 'update';
    onSubmit: (values: BlogPost) => void;
}

const BlogForm: React.FC<BlogFormProps> = (props: BlogFormProps) => {
    const { initialValues, onSubmit, action } = props;
    const [form] = Form.useForm();

    console.log('initialValues', initialValues);

    const handleFinish = (values: any) => {
        onSubmit({
            ...values,
        });
    };

    const showCreateOrUpdateConfirm = (values: any) => {
        confirm({
            title: `Are you sure ${action} this blog post?`,
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleFinish(values);
            },
            onCancel() {
            },
        });
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={showCreateOrUpdateConfirm}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="author"
                        label="Author"
                        rules={[{ required: true, message: 'Please input the author!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="content"
                        label="Content"
                        rules={[{ required: true, message: 'Please input the content!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Col>
            </Row>
            {action === 'update' && <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="createdAt"
                        label="Created At"
                        rules={[{ required: true, message: 'Please select the creation date!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="updatedAt"
                        label="Updated At"
                        rules={[{ required: true, message: 'Please select the update date!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                </Col>
            </Row>}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default BlogForm;
