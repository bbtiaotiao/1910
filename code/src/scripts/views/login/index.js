import "./index.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
    NavLink
} from "react-router-dom";

import { history } from "&";

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { login } from "../../actions";
import {axios} from "&";


@connect()
class Login extends Component {

    checkmobile = (rule, value, callback) => {
        let reg = /^1[3456789]\d{9}$/;
        if (value && !reg.test(value)) {
            if (value !== "admin") {
                callback(`请输入正确的手机号`)
            }
        }
        callback()
    };

    checkMobile = (rule, value, callback) => {
        let reg = /^[\w]{6,16}$/;
        if (value && !reg.test(value)) {
            callback(`请输入数字字母组成的6-16位密码`)
        }
        callback()
    };

    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                axios.post("/login", {
                    mobile: values.phone,
                    password: values.password,
                }).then(res=>{
                    if (res.data.type == 1) {
                        sessionStorage.token = res.data.token;
                        sessionStorage.mobile = values.phone;
                        sessionStorage.usertype = res.data.result.usertype;
                        history.push("/home/info");

                    }
                })

                // this.props.dispatch(login({
                //     url: '/login',
                //     params: {
                //         mobile: values.phone,
                //         password: values.password,
                //     },
                // }).then(res => {
                //     console.log(res.payload.data.type)
                //     if (res.payload.data.type == 1) {
                //         sessionStorage.token = res.payload.data.token;
                //         sessionStorage.mobile = values.phone;
                //         sessionStorage.usertype = res.payload.data.result.usertype;
                //         history.push("/home");

                //     }
                // })
                // )
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="box">
                    <div className="ltoplog">
                        <img src="https://oa.deepcam.cn/images/noface.png" alt="" />
                    </div>
                    <div className="content">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item label="手机号">
                                {getFieldDecorator('phone', {
                                    rules: [
                                        { required: true, message: '请输入你的手机号' },
                                        { validator: this.checkmobile },
                                    ],
                                })(<Input style={{ width: '100%' }} />)}
                            </Form.Item>
                            <Form.Item label="密码" hasFeedback >
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码',
                                        },
                                        {
                                            validator: this.checkMobile,
                                        },
                                    ],
                                })(<Input.Password />)}
                            </Form.Item>

                            <div>
                                <Button style={{ background: "#1abc9c" }} className="btn" type="primary" htmlType="submit">登录</Button>
                                <Button className="btn" type="danger" style={{ marginLeft: 8 }}
                                    onClick={() => history.push("/signup")}>注册</Button>
                            </div>
                        </Form>
                    </div>

                </div>
            </div>
        )
    }
}

Login = Form.create()(Login);
export default Login;