/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/26 14:22
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/26 14:22
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import Cookies from 'js-cookie'
import {Form, Row, Col, Button, Table, Input, Modal, message, Upload} from 'antd';
import {
    getFold,
    addFold,
    alterFold,
    deleteFold,
    getUploadList,
    alterUpload,
    deleteUpload,
    setStore
} from '../../redux/upload/upload.redux';
import EditableTree from '../../components/editableTree/EditableTree';
import './upload.scss';

const mapStateProps = state => ({
    upload: state.upload
});

const mapDispatchToProps = dispatch => ({
    getFold, addFold, alterFold, deleteFold,
    getUploadList, alterUpload, deleteUpload, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class UploadForm extends Component {

    state = {
        foldVisible: false, // 新建目录
        moveVisible: false, // 移动
        move_fold_id: '', // 移动到的目录
        foldName: '', // 目录名称
        parentId: -1,
        action: '', // 上传地址
    };

    componentWillMount() {
        this.getFold()
    };

    componentDidMount() {

    };

    getFold = () => {
        this.props.getFold({
            onSuccess: (data) => {
                if (!data.length) {
                    return
                }

                this.props.setStore({
                    foldId: data[0]._id
                });

                this.props.getUploadList({
                    foldId: data[0]._id,
                    current_page: this.props.upload.current_page,
                    page_size: this.props.upload.page_size
                })
            }
        });
    };

    handleTableChange = (pagination, filters, sorter) => {
        this.props.setStore({
            current_page: pagination.current,
        });

        setTimeout(() => {
            let {foldId, current_page, page_size} = this.props.upload;
            this.props.getUploadList({foldId, current_page, page_size})
        }, 50)
    };

    onSelect = ({item}) => {
        this.props.setStore({
            foldId: item._id
        });

        this.props.getUploadList({
            foldId: item._id,
            current_page: this.props.upload.current_page,
            page_size: this.props.upload.page_size
        })
    };

    onMoveSelect = ({item}) => {
        this.setState({
            move_fold_id: item._id
        });
    };

    onExpand = (value) => {
    };

    onAdd = ({item}) => {
        this.setState({
            foldVisible: true,
            parentId: item._id
        })
    };

    onSave = ({item}) => {
        this.props.alterFold({
            _id: item._id,
            name: item.value,
            onSuccess: () => {
                this.getFold();
            }
        });
    };

    onDelete = ({item}) => {
        Modal.confirm({
            title: '删除',
            content: '确定删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                this.props.deleteFold({
                    _id: item._id,
                    onSuccess: () => {
                        this.getFold();
                    }
                });
            },
        });
    };

    handleUpload = () => {
        let {foldId} = this.props.upload;
        let action = `${process.env.api.common_url}/api/upload/file/${foldId}`;
        this.setState({action})
    };

    render() {
        const {tree_list} = this.props.upload;

        const columns = [
            {
                title: '文件名',
                dataIndex: 'file_name',
                key: 'file_name',
                width: 200,
                fixed: 'left',
            },
            {
                title: '创建日期',
                dataIndex: 'create_date',
                key: 'create_date',
                width: 200,
            },
            {
                title: '大小',
                dataIndex: 'file_size',
                key: 'file_size',
                width: 200,
                render: (value, params) => (
                    <span>{`${(value / 1024).toFixed(3)}kb`}</span>
                )
            },
            {
                title: '图片',
                width: 200,
                render: (value, params) => (
                    <img
                        src={params.file_url}
                        alt=""
                        style={{width: '40px', height: '40px', verticalAlign: 'middle', objectFit: 'cover'}}
                    />
                )
            },
            {
                title: '地址',
                dataIndex: 'file_url',
                key: 'file_url',
                width: 200,
                render: (value, params) => (
                    <span>{value}</span>
                )
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 140,
                render: (value, params) => (
                    <span>
                        <Button
                            type="primary"
                            size="small"
                            style={{marginRight: '5px'}}
                            onClick={() => {

                                this.setState({
                                    moveVisible: true,
                                    move_id: params._id
                                });

                                let tree_list = this.props.upload.tree_list;

                                setTimeout(() => {
                                    this.props.setStore({
                                        move_tree_list: tree_list
                                    })
                                }, 100)
                            }}
                        >修改
                        </Button>
                        <Button
                            type="danger"
                            size="small"
                            onClick={() => {
                                Modal.confirm({
                                    title: '删除',
                                    content: '确定删除吗？',
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk: async () => {
                                        this.props.deleteUpload({
                                            _id: params._id,
                                            onSuccess: () => {
                                                this.getFold()
                                            }
                                        })
                                    },
                                });
                            }}
                        >删除
                        </Button>
                    </span>
                ),
            },
        ];

        const paginationProps = {
            pageSize: this.props.upload.page_size,
            total: this.props.upload.total_count,
        };

        const renderMoveTreeNodes = (
            <EditableTree
                list={this.props.upload.move_tree_list}
                onSelect={this.onMoveSelect}
                editBtn={false}
                plusBtn={false}
                minusBtn={false}
            />
        );

        const uploadProps = {
            multiple: true,
            headers: {
                Authorization: Cookies.get('token')
            },
            action: this.state.action,
            beforeUpload(file, fileList) {

            },
            showUploadList: false,
            onChange: (value) => {
                if (value.file.response) {
                    this.getFold();
                }
            }
        };

        return (
            <div style={{height: '100%'}}>
                <Row gutter={16} style={{height: '100%'}}>
                    <Col span={4} className="tree">
                        <div>
                            <h2 className="title">文件目录</h2>
                            <Button className="button" size="small" onClick={() => {
                                this.setState(() => ({foldVisible: true, parentId: -1}));
                            }}>新建目录</Button>
                        </div>
                        <EditableTree
                            list={tree_list}
                            onSelect={this.onSelect}
                            onExpand={this.onExpand}
                            onSave={this.onSave}
                            onAdd={this.onAdd}
                            onDelete={this.onDelete}
                        />
                    </Col>
                    <Col span={19}>
                        <Upload {...uploadProps}>
                            <Button type="primary" style={{margin: '10px'}} onClick={this.handleUpload}>上传文件</Button>
                        </Upload>
                        <Table
                            columns={columns}
                            dataSource={this.props.upload.upload_list}
                            rowKey="_id"
                            pagination={paginationProps}
                            onChange={this.handleTableChange}
                            scroll={{ x: 1500, y: 600 }}
                        />
                    </Col>
                </Row>

                <Modal
                    title="修改"
                    visible={this.state.moveVisible}
                    destroyOnClose
                    onOk={() => {

                        if (!this.state.move_fold_id) {
                            return message.info('请选择目录')
                        }

                        this.props.alterUpload({
                            fold_id: this.state.move_fold_id,
                            _id: this.state.move_id,
                            onSuccess: () => {
                                this.getFold();

                                this.setState({
                                    moveVisible: false,
                                    move_fold_id: ''
                                })
                            }
                        });
                    }}
                    onCancel={() => {
                        this.setState(() => ({moveVisible: false, move_fold_id: ''}));
                    }}
                >
                    <p>移动至目录：</p>
                    {renderMoveTreeNodes}
                </Modal>

                <Modal
                    title="新建目录"
                    visible={this.state.foldVisible}
                    destroyOnClose
                    onOk={() => {
                        this.props.addFold({
                            parentId: this.state.parentId,
                            name: this.state.foldName,
                            onSuccess: () => {
                                this.getFold();

                                this.setState({
                                    foldVisible: false
                                })
                            }
                        });
                    }}
                    onCancel={() => {
                        this.setState(() => ({foldVisible: false}));
                    }}
                >
                    <Input
                        placeholder="请输入名称"
                        onChange={(e) => {
                            this.setState({foldName: e.target.value})
                        }}
                    />
                </Modal>
            </div>
        )
    }
}

const UploadPage = Form.create()(UploadForm);

export default UploadPage
