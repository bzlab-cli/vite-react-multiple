/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/24 16:18
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/24 16:18
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Button, Table, Input, Modal} from 'antd';
import {getTagsList, deleteTags, addTags, alterTags, setStore} from '../../redux/tag/list.redux';
import styles from './tag.scss';

const FormItem = Form.Item;
const {TextArea} = Input;

const mapStateProps = state => ({
    tags_list: state.tags_list
});

const mapDispatchToProps = dispatch => ({
    getTagsList, deleteTags, addTags, alterTags, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class ListForm extends Component {

    state = {visible: false};

    formLayout = {
        labelCol: {span: 7},
        wrapperCol: {span: 13},
    };

    componentWillMount() {
        this.getTagsList()
    }

    getTagsList = () => {
        let {current_page, page_size} = this.props.tags_list;
        this.props.getTagsList({current_page, page_size})
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const {form} = this.props;
        const {current} = this.state;

        form.validateFields((err, fieldsValue) => {
            if (err) return;

            let {tags_name, tags_desc} = fieldsValue;

            let params;

            if (typeof current !== 'undefined') {
                params = {
                    _id: current._id,
                    tags_name,
                    tags_desc: typeof tags_desc !== 'undefined' ? tags_desc : '',
                    onSuccess: () => {
                        this.getTagsList();
                        this.setState({
                            visible: false,
                        });
                    }
                };

                this.props.alterTags(params)
            } else {
                params = {
                    tags_name,
                    tags_desc: typeof tags_desc !== 'undefined' ? tags_desc : '',
                    onSuccess: () => {
                        this.getTagsList();
                        this.setState({
                            visible: false,
                        });
                    }
                };

                this.props.addTags(params)
            }
        });
    };

    handleTableChange = (pagination, filters, sorter) => {
        this.props.setStore({
            current_page: pagination.current,
        });

        setTimeout(() => {
            this.getTagsList()
        }, 50)
    };

    render() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'tags_name',
                key: 'tags_name',
                width: 400,
                fixed: 'left',
            },
            {
                title: '描述',
                dataIndex: 'tags_desc',
                width: 400,
                key: 'tags_desc',
            },
            {
                title: '文章数',
                dataIndex: 'tags_article_num',
                width: 400,
                key: 'tags_article_num',
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                render: (value, params) => (
                    <span>
                        <Button
                            type="primary"
                            size="small"
                            style={{marginRight: '5px'}}
                            onClick={() => {
                                this.setState({
                                    visible: true,
                                    current: params
                                });
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
                                        this.props.deleteTags({
                                            _id: params._id,
                                            onSuccess: () => {
                                                this.getTagsList()
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

        const {visible, current = {}} = this.state;

        const modalFooter = {okText: '确认', cancelText: '取消', onOk: this.handleSubmit, onCancel: this.handleCancel};

        const {
            form: {getFieldDecorator},
        } = this.props;

        const getModalContent = () => {
            return (
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="标签名称" {...this.formLayout}>
                        {getFieldDecorator('tags_name', {
                            rules: [{required: true, message: '请输入标签名称'}],
                            initialValue: current.tags_name,
                        })(<Input placeholder="请输入标签名称"/>)}
                    </FormItem>
                    <FormItem label="标签描述" {...this.formLayout}>
                        {getFieldDecorator('tags_desc', {
                            rules: [{message: '请输入标签描述'}],
                            initialValue: current.tags_desc,
                        })(<TextArea rows={4} placeholder="请输入标签描述"/>)}
                    </FormItem>
                </Form>
            );
        };

        const paginationProps = {
            pageSize: this.props.tags_list.page_size,
            total: this.props.tags_list.total_count,
        };

        return (
            <div>
                <Form layout="inline">
                    <Button
                        type="primary"
                        onClick={() => {
                            this.setState({
                                visible: true,
                                current: undefined,
                            });
                        }}
                    >
                        添加标签
                    </Button>
                </Form>
                <Table
                    style={{marginTop: '20px'}}
                    columns={columns}
                    dataSource={this.props.tags_list.tag_list}
                    rowKey="_id"
                    pagination={paginationProps}
                    scroll={{x: 1500, y: 600}}
                    onChange={this.handleTableChange}
                />
                <Modal
                    title={`${current._id ? '编辑' : '添加'}`}
                    className={styles.standardListForm}
                    width={600}
                    destroyOnClose
                    visible={visible}
                    {...modalFooter}
                >
                    {getModalContent()}
                </Modal>
            </div>
        )
    }
}

const List = Form.create()(ListForm);

export default List
