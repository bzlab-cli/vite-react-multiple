/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/5/19 上午12:03
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/5/19 上午12:03
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './login.scss'
import {
    Form,
    Icon,
    Input,
    Button
} from 'antd'

import {register} from '../../redux/user/user.redux'

const FormItem = Form.Item;

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    register
});

@connect(
    mapStateToProps,
    mapDispatchToProps()
)
class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmDirty: false,
        };

        this.onLogin = this.onLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
    }

    get backgroundImage() {
        return `url(/static/images/login-bg.jpg)`
    }

    onLogin(e) {
        e.preventDefault();
        this.props.history.push('/login')
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.register(values)
            }
        })
    }

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    /**
     * 密码输入验证
     * @param rule
     * @param value
     * @param callback
     */
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value.length < 8) {
            callback('密码至少需要8位');
            return
        }

        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    /**
     * 再次密码输入验证
     * @param rule
     * @param value
     * @param callback
     */
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value.length < 8) {
            callback('密码至少需要8位');
            return
        }

        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致');
        } else {
            callback();
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login" style={{backgroundImage: this.backgroundImage}}>
                {this.props.user.redirectTo ?
                    <Redirect to={this.props.user.redirectTo}/> : null}

                <div className="login-box">
                    <h3 className="login-title"><Icon type="user" style={{marginRight: '3px'}}/>注册</h3>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入用户名'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="请输入用户名"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    message: '请输入密码',
                                }, {
                                    validator: this.validateToNextPassword,
                                }]
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="请输入密码"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true,
                                    message: '请再次输入密码',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="请再次输入密码" onBlur={this.handleConfirmBlur}/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                确定注册
                            </Button>
                            <a href="" className="login-register" onClick={this.onLogin}>登录</a>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

const Register = Form.create()(RegisterForm);

export default Register
