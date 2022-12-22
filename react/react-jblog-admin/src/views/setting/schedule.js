/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/25 16:27
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/25 16:27
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Form, Typography, Tabs, Button, Table, Input, Modal, Switch} from 'antd';
import {
    getScheduleList,
    addSchedule,
    alterSchedule,
    deleteSchedule,
    startAllSchedule,
    setStore
} from '../../redux/setting/schedule.redux';
import styles from './schedule.scss';
import {formatDate} from '../../utils';

const {Title, Paragraph} = Typography;
const {TabPane} = Tabs;
const FormItem = Form.Item;
const {TextArea} = Input;

const mapStateProps = state => ({
    schedule: state.schedule
});

const mapDispatchToProps = dispatch => ({
    getScheduleList, addSchedule, alterSchedule, deleteSchedule, startAllSchedule, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class ScheduleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {visible: false}
    }

    formLayout = {
        labelCol: {span: 7},
        wrapperCol: {span: 13},
    };

    componentDidMount() {
        this.getScheduleList()

    }

    getScheduleList = () => {
        let {keyword, current_page, page_size} = this.props.schedule;
        this.props.getScheduleList({keyword, current_page, page_size})
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

            let {task_name, task_type, task_cookie, task_desc, task_cron} = fieldsValue;
            let params;
            // let cron = '';
            /*let {weekSelectValue, dateSelectValue, timeValue} = this.props.schedule;

            if (weekSelectValue === 'day') {
                cron = dateCron({type: 'day', date: timeValue})
            } else if (weekSelectValue === 'week') {
                cron = dateCron({type: 'week', week: [dateSelectValue + 1], date: timeValue})
            } else if (weekSelectValue === 'month') {
                cron = dateCron({type: 'month', month: [dateSelectValue + 1], date: timeValue})
            } else if (weekSelectValue === 'inputCronState') {
                cron = this.props.schedule.inputCronValue;
            }

            if (!cron) {
                return message.info('请选择或输入cron时间');
            }*/

            if (typeof current !== 'undefined') {
                params = {
                    _id: current._id,
                    task_name,
                    task_type,
                    task_cookie,
                    task_desc: typeof task_desc !== 'undefined' ? task_desc : '',
                    task_cron,
                    task_switch: this.props.schedule.task_switch,
                    onSuccess: () => {
                        this.getScheduleList();
                        this.setState({
                            visible: false,
                        });
                    }
                };

                console.log(params);
                this.props.alterSchedule(params)
            } else {
                params = {
                    task_name,
                    task_type,
                    task_cookie,
                    task_desc: typeof task_desc !== 'undefined' ? task_desc : '',
                    task_cron,
                    task_switch: this.props.schedule.task_switch,
                    onSuccess: () => {
                        this.getScheduleList();
                        this.setState({
                            visible: false,
                        });
                    }
                };

                console.log('params', params);
                this.props.addSchedule(params)
            }
        });
    };

    onTabChange = (key) => {
        console.log(key);
    };

    onWeekChange = (val) => {
        if (val === 'day') {
            this.props.setStore({
                dateList: [],
                inputCronState: false
            });
        } else if (val === 'week') {
            this.props.setStore({
                dateSelectValue: 0,
                dateList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                inputCronState: false
            });
        } else if (val === 'month') {
            let day = Array.apply(null, Array(31)).map((it, key) => key + 1 + '号');
            this.props.setStore({
                dateSelectValue: 0,
                dateList: day,
                inputCronState: false
            });
        } else if (val === 'inputCronState') {
            this.props.setStore({
                dateList: [],
                inputCronState: true
            });
        }

        this.props.setStore({
            weekSelectValue: val,
        });
        console.log(val);
    };

    onDateChange = (val) => {
        console.log(val);

        this.props.setStore({
            dateSelectValue: val,
        });
    };

    onTimeChange = (val) => {
        console.log(val);

        this.props.setStore({
            timeValue: formatDate(val.toDate()),
        });
    };

    handleTableChange = (pagination, filters, sorter) => {
        this.props.setStore({
            current_page: pagination.current,
        });

        setTimeout(() => {
            this.getScheduleList()
        }, 50)
    };

    render() {
        const columns = [
            {
                title: '任务名称',
                dataIndex: 'task_name',
                key: 'task_name',
                width: 150,
                fixed: 'left',
            },
            {
                title: '任务类型',
                dataIndex: 'task_type',
                width: 150,
                key: 'task_type'
            },
            {
                title: '任务cookie',
                dataIndex: 'task_cookie',
                key: 'task_cookie',
            },
            {
                title: '任务描述',
                dataIndex: 'task_desc',
                key: 'task_desc',
            },
            {
                title: '任务时间',
                dataIndex: 'task_cron',
                key: 'task_cron',
            },
            {
                title: '运行状态',
                dataIndex: 'task_switch',
                key: 'task_switch',
                render: (value, params) => (
                    <span>{value ? '已开启' : '已关闭'}</span>
                )
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
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

                                this.props.setStore({
                                    task_switch: params.task_switch
                                })
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
                                        this.props.deleteSchedule({
                                            _id: params._id,
                                            onSuccess: () => {
                                                this.getScheduleList()
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
                    <FormItem label="任务名称" {...this.formLayout}>
                        {getFieldDecorator('task_name', {
                            rules: [{required: true, message: '请输入任务名称'}],
                            initialValue: current.task_name,
                        })(<Input placeholder="请输入任务名称"/>)}
                    </FormItem>
                    <FormItem label="任务类型" {...this.formLayout}>
                        {getFieldDecorator('task_type', {
                            rules: [{required: true, message: '请输入任务类型'}],
                            initialValue: current.task_type,
                        })(<Input placeholder="请输入任务类型"/>)}
                    </FormItem>
                    <FormItem label="cookie" {...this.formLayout}>
                        {getFieldDecorator('task_cookie', {
                            rules: [{required: true, message: '请输入任务cookie'}],
                            initialValue: current.task_cookie,
                        })(<TextArea rows={4} placeholder="请输入任务cookie"/>)}
                    </FormItem>
                    <FormItem label="任务描述" {...this.formLayout}>
                        {getFieldDecorator('task_desc', {
                            rules: [{message: '请输入任务描述'}],
                            initialValue: current.task_desc,
                        })(<TextArea rows={4} placeholder="请输入任务描述"/>)}
                    </FormItem>
                    <FormItem label="任务时间" {...this.formLayout}>
                        {getFieldDecorator('task_cron', {
                            rules: [{required: true, message: '请输入任务时间'}],
                            initialValue: current.task_cron,
                        })(<Input placeholder="请输入任务时间"/>)}
                    </FormItem>

                    {/*<FormItem label="周期" {...this.formLayout} rules={[{required: true}]}>
                        <Select
                            placeholder="选择周期"
                            defaultValue={this.props.schedule.weekSelectValue}
                            onChange={this.onWeekChange}
                        >
                            <Option value="day">每天</Option>
                            <Option value="week">每周</Option>
                            <Option value="month">每月</Option>
                            <Option value="inputCronState">手动输入</Option>
                        </Select>
                    </FormItem>
                    {this.props.schedule.dateList.length > 0 &&
                    <FormItem label="日期" {...this.formLayout} rules={[{required: true}]}>
                        <Select
                            placeholder="选择日期"
                            defaultValue={this.props.schedule.dateSelectValue}
                            onChange={this.onDateChange}
                        >
                            {this.props.schedule.dateList.map((it, key) => (
                                <Option
                                    key={key}
                                    value={key}>
                                    {it}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>}
                    {!this.props.schedule.inputCronState ? (
                        <FormItem label="时间" {...this.formLayout} rules={[{required: true}]}>
                            <TimePicker placeholder="选择时间" onChange={this.onTimeChange}/>
                        </FormItem>
                    ) : (
                        <FormItem label="cron" {...this.formLayout} rules={[{required: true}]}>
                            <Input
                                placeholder="请输入cron"
                                value={this.props.schedule.inputCronValue}
                                onChange={(event) => {
                                    this.props.setStore({
                                        inputCronValue: event.target.value,
                                    });
                                }}/>
                        </FormItem>
                    )}*/}
                    <FormItem label="开关" {...this.formLayout}>
                        <Switch
                            checked={this.props.schedule.task_switch}
                            onChange={(checked) => {
                                this.props.setStore({
                                    task_switch: checked
                                });
                            }}/>
                    </FormItem>
                </Form>
            );
        };

        const SetTabs = () => (
            <Tabs defaultActiveKey="0" onChange={this.onTabChange}>
                {this.props.schedule.tabs_list.map((item, key) => (
                    <TabPane
                        tab={item.name}
                        key={item.key}
                    >
                    </TabPane>
                ))}
            </Tabs>
        );

        const paginationProps = {
            pageSize: this.props.schedule.page_size,
            total: this.props.schedule.total_count,
        };

        return (
            <div>
                <Typography>
                    <Title level={4}>设置定时任务</Title>
                    <Paragraph>
                        设置定时任务后，每天都会定时执行
                    </Paragraph>
                </Typography>
                <SetTabs/>
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
                        添加任务
                    </Button>
                    <Button
                        type="primary"
                        style={{marginLeft: '10px'}}
                        onClick={() => {
                            this.props.startAllSchedule()
                        }}
                    >
                        运行全部任务
                    </Button>
                    <Table
                        style={{marginTop: '20px'}}
                        columns={columns}
                        dataSource={this.props.schedule.schedule_list}
                        rowKey="_id"
                        pagination={paginationProps}
                        scroll={{x: 1500, y: 550}}
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
                </Form>
            </div>
        )
    }
}

const Schedule = Form.create()(ScheduleForm);

export default Schedule
