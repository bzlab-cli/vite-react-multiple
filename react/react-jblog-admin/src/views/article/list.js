import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Form, Select, Input, Button, Table, Modal} from 'antd';
import {getTagsList, getArticleList, deleteArticle, setStore} from '../../redux/article/list.redux';

const {Option} = Select;

const mapStateProps = state => ({
    article: state.article_list
});

const mapDispatchToProps = dispatch => ({
    getTagsList, getArticleList, deleteArticle, setStore
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
        this.getArticleList()
    }

    getArticleList = () => {
        let {keyword, tag, state, current_page, page_size} = this.props.article;
        this.props.getArticleList({keyword, tag, state, current_page, page_size})
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

        let {keyword, tag, state, current_page, page_size} = this.props.article;
        this.props.getArticleList({keyword, tag, state, current_page, page_size})
    };

    handleTableChange = (pagination, filters, sorter) => {
        this.props.setStore({
            current_page: pagination.current,
        });

        setTimeout(() => {
            let {keyword, tag, state, current_page, page_size} = this.props.article;
            this.props.getArticleList({keyword, tag, state, current_page, page_size})
        }, 50)
    };

    formatState = val => {
        return val === 0 ? "草稿" : "发布";
    };

    render() {
        const columns = [
            {
                title: '文章标题',
                dataIndex: 'article_title',
                key: 'article_title',
                width: 300,
                fixed: 'left',
            },
            {
                title: '创建日期',
                dataIndex: 'article_create_time',
                key: 'article_create_time',
                width: 200,
                render: (value, params) => (
                    <span>{value}</span>
                )
            },
            {
                title: '修改日期',
                dataIndex: 'article_update_time',
                key: 'article_update_time',
                width: 200,
                render: (value, params) => (
                    <span>{value}</span>
                )
            },
            {
                title: '标签',
                dataIndex: 'article_tags',
                key: 'article_tags',
                width: 200,
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
                dataIndex: 'article_state',
                key: 'article_state',
                width: 200,
                render: (value, params) => (
                    <span>{this.formatState(params.article_state)}</span>
                )
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
                                let prefix = 'https://www.jrucker.cn';
                                window.open(`${prefix}/detail/${params._id}`, '_blank')
                            }}
                        >查看
                        </Button>
                        <Button
                            type="primary"
                            size="small"
                            style={{marginRight: '5px'}}
                            onClick={() => this.props.history.push(`/app/article/edit/${params._id}`)}
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
                                        this.props.deleteArticle({
                                            _id: params._id,
                                            onSuccess: () => {
                                                this.getArticleList()
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
            pageSize: this.props.article.page_size,
            total: this.props.article.total_count,
        };

        return (
            <div>
                <Form layout="inline">
                    <Form.Item label="标签：">
                        <Select defaultValue={this.props.article.tag} style={{width: 150}}
                                onChange={this.handleTagChange}>
                            {this.props.article.tag_list.map((item, key) => (
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
                        <Select value={this.props.article.state} style={{width: 150}}
                                onChange={this.handleStateChange}>
                            {this.props.article.state_list.map((item, key) => (
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
                            value={this.props.article.keyword}
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
                        onClick={() => this.props.history.push(`/app/article/new`)}
                    >
                        写文章
                    </Button>
                </Form>
                <Table
                    style={{marginTop: '20px'}}
                    columns={columns}
                    dataSource={this.props.article.article_list}
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
