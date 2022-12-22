/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/25 16:27
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/25 16:27
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Form, Input, Button} from 'antd';
import {getSetting, alterSetting, setStore} from '../../redux/setting/upyun.redux';

const mapStateProps = state => ({
    upyun: state.upyun
});

const mapDispatchToProps = dispatch => ({
    getSetting, alterSetting, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class UpyunForm extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        console.log(this);
        this.props.getSetting()
    }

    handleSave = () => {
        this.props.alterSetting({
            bucket: this.props.upyun.bucket,
            operatorname: this.props.upyun.operatorname,
            operatorpwd: this.props.upyun.operatorpwd,
            endpoint: this.props.upyun.endpoint,
        })
    };

    render() {
        const formLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 13},
        };

        return (
            <div>
                <Form>
                    <Form.Item label="BUCKET：" {...formLayout}>
                        <Input
                            placeholder="请输入BUCKET"
                            name="bucket"
                            value={this.props.upyun.bucket}
                            onChange={(event) => {
                                this.props.setStore({
                                    bucket: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="OPERATORNAME：" {...formLayout}>
                        <Input
                            placeholder="请输入OPERATORNAME"
                            name="operatorname"
                            value={this.props.upyun.operatorname}
                            onChange={(event) => {
                                this.props.setStore({
                                    operatorname: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="OPERATORPWD：" {...formLayout}>
                        <Input
                            placeholder="请输入OPERATORPWD"
                            name="operatorpwd"
                            value={this.props.upyun.operatorpwd}
                            onChange={(event) => {
                                this.props.setStore({
                                    operatorpwd: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="ENDPOINT：" {...formLayout}>
                        <Input
                            placeholder="请输入ENDPOINT"
                            name="endpoint"
                            value={this.props.upyun.endpoint}
                            onChange={(event) => {
                                this.props.setStore({
                                    endpoint: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        onClick={this.handleSave}
                    >
                        保存
                    </Button>
                </Form>
            </div>
        )
    }
}

const Upyun = Form.create()(UpyunForm);

export default Upyun
