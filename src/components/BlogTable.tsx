import { Component } from 'react';
import { Button, Space, Table, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { BlogPost } from "../models/BlogPost";

const { confirm } = Modal;

interface BlogTableProps {
    data: BlogPost[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

class BlogTable extends Component<BlogTableProps> {
    showDeleteConfirm = (id: string) => {
        confirm({
            title: 'Are you sure delete this blog post?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.props.onDelete(id);
            },
            onCancel() {
                // Handle cancel if needed
            },
        });
    };

    render() {
        const { data, onEdit } = this.props;

        const columns: ColumnsType<BlogPost> = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                hidden: true,
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
            },
            {
                title: 'Created At',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (date: Date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                title: 'Updated At',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                render: (date: Date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                title: 'Actions',
                key: 'actions',
                render: (_, record) => (
                    <Space size="middle">
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => onEdit(record.id)}
                        />
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => this.showDeleteConfirm(record.id)}
                            danger
                        />
                    </Space>
                ),
            },
        ];

        return <Table columns={columns} dataSource={data} rowKey="id" />;
    }
}

export default BlogTable;
