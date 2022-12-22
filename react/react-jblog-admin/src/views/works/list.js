import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Form, Select, Input, Button, Table, Modal} from 'antd';
import {getTagsList, getWorksList, deleteWorks, setStore} from '../../redux/works/list.redux';

const {Option} = Select;

const mapStateProps = state => ({
    works: state.works_list
});

const mapDispatchToProps = dispatch => ({
    getTagsList, getWorksList, deleteWorks, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class ListForm extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillMount() {
        this.props.getTagsList()
    }

    componentDidMount() {
        console.log(this);
        this.getWorksList()
    }

    getWorksList = () => {
        let {keyword, tag, state, current_page, page_size} = this.props.works;
        this.props.getWorksList({keyword, tag, state, current_page, page_size})
    };

    handleTagChange = value => {
        this.props.setStore({
            tag: value,
        });
    };

    handleStateChange = value => {
        this.props.setStore({
            state: value,
        });

        // this.setState(prevState => ({state: value}))
    };

    /**
     * 搜索
     * @params e
     */
    handleSearch = e => {
        e.preventDefault();

        let {keyword, tag, state, current_page, page_size} = this.props.works;
        this.props.getWorksList({keyword, tag, state, current_page, page_size})
    };

    handleTableChange = (pagination, filters, sorter) => {
        this.props.setStore({
            current_page: pagination.current,
        });

        setTimeout(() => {
            let {keyword, tag, state, current_page, page_size} = this.props.works;
            this.props.getWorksList({keyword, tag, state, current_page, page_size})
        }, 50)
    };

    formatState = val => {
        return val === 0 ? "草稿" : "发布";
    };

    render() {
        const columns = [
            {
                title: '作品标题',
                dataIndex: 'works_title',
                key: 'works_title',
                width: 250,
                fixed: 'left',
            },
            {
                title: '创建日期',
                dataIndex: 'works_create_time',
                key: 'works_create_time',
                width: 200,
                render: (value, params) => (
                    <span>{value}</span>
                )
            },
            {
                title: '修改日期',
                dataIndex: 'works_update_time',
                key: 'works_update_time',
                width: 200,
                render: (value, params) => (
                    <span>{value}</span>
                )
            },
            {
                title: '标签',
                dataIndex: 'works_tags',
                width: 200,
                key: 'works_tags',
                render: (value, params) => {
                    if (value.length) {
                        return <ul>
                            {value.map((v, k) => (
                                <li key={k}>
                                    {
                                        k === value.length - 1 ? v.tags_name : `${v.tags_name},`
                                    }
                                </li>
                            ))}
                        </ul>
                    }

                    return <span>无</span>
                }
            },
            {
                title: '状态',
                dataIndex: 'works_state',
                key: 'works_state',
                render: (value, params) => (
                    <span>{this.formatState(params.works_state)}</span>
                )
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                render: (value, params) => (
                    <span>
                        {/*<Button
                            type="primary"
                            size="small"
                            style={{marginRight: '5px'}}
                            onClick={() => {
                                let prefix = 'https://www.jrucker.cn';
                                window.open(`${prefix}/detail/${params._id}`, '_blank')
                            }}
                        >查看
                        </Button>*/}
                        <Button
                            type="primary"
                            size="small"
                            style={{marginRight: '5px'}}
                            onClick={() => this.props.history.push(`/app/works/edit/${params._id}`)}
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
                                        this.props.deleteWorks({
                                            _id: params._id,
                                            onSuccess: () => {
                                                this.getWorksList()
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
            pageSize: this.props.works.page_size,
            total: this.props.works.total_count,
        };

        return (
            <div>
                <Form layout="inline">
                    <Form.Item label="标签：">
                        <Select defaultValue={this.props.works.tag} style={{width: 150}}
                                onChange={this.handleTagChange}>
                            {this.props.works.tag_list.map((item, key) => (
                                <Option
                                    key={key}
                                    value={item._id}
                                >
                                    {item.tags_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="状态：">
                        <Select value={this.props.works.state} style={{width: 150}}
                                onChange={this.handleStateChange}>
                            {this.props.works.state_list.map((item, key) => (
                                <Option
                                    key={key}
                                    value={item.value}
                                >
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="搜索：">
                        <Input
                            placeholder="请输入关键词"
                            name="keyword"
                            value={this.props.works.keyword}
                            onChange={(event) => {
                                this.props.setStore({
                                    keyword: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Button
                        style={{margin: '4px'}}
                        type="primary"
                        onClick={this.handleSearch}
                    >
                        搜索
                    </Button>
                    <Button
                        type="default"
                        style={{marginLeft: '10px'}}
                        onClick={() => this.props.history.push(`/app/works/new`)}
                    >
                        写作品
                    </Button>
                </Form>
                <Table
                    style={{marginTop: '20px'}}
                    columns={columns}
                    dataSource={this.props.works.works_list}
                    rowKey="_id"
                    pagination={paginationProps}
                    loading={this.props.loading}
                    scroll={{x: 1500, y: 600}}
                    onChange={this.handleTableChange}
                />
            </div>

        )
    }
}

const List = Form.create()(ListForm);

export default List
