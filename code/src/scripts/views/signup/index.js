import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.scss";
import { axios } from "&"

import {
    Form,
    Input,
    Row,
    Col,
    Button,
} from 'antd';
import { register } from "../../actions";
import { history } from "&";

var timer = null;

@connect()
class SignUp extends Component {

    state = {
        confirmDirty: false,
        count: 60,
        txt: "发送验证码",
        codeFlag: true,
        toggle: true,


    };

    checkCode = (rule, value, callback) => {
        let reg = /^[0-9]{4}$/;
        if (value && !reg.test(value)) {
            callback(`请输入收到的验证码`)
        }
        callback();
    };

    checkmobile = (rule, value, callback) => {
        let reg = /^1[3456789]\d{9}$/;
        if (value && !reg.test(value)) {
            if (value !== "admin") {
                callback(`请输入正确的手机号`)
            }
        }
        callback()

    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form,
            reg = /^[\w]{6,16}$/;
        if (value && value !== form.getFieldValue('firstPassword')) {
            callback("两次密码不一致");
        } else if (value && !reg.test(value)) {
            callback(`请输入数字字母组成的6-16位密码`)
        } else {
            callback()
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form,
            reg = /^[\w]{6,16}$/;
        if (value && this.state.confirmDirty) {
            form.validateFields(['password'], { force: true });
        } else if (value && !reg.test(value)) {
            callback(`请输入数字字母组成的6-16位密码`)
        }
        callback()
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // console.log('Received values of form: ', values, err);
            if (!err) {
                // console.log('Received values of form: ', values);
                // axios.post("/checkCode", {
                //     mobile: this.mobile.state.value,
                //     code: values.code,
                // }).then(res => {
                //     if (!!res.data.type) {
                //         // sessionStorage.token=res.data.token;
                //         sessionStorage.mobile = this.mobile.state.value;
                //         //    history.push("/login");
                //         clearInterval(timer);
                //         timer = null;
                //         this.props.dispatch(register({
                //             url: '/register',
                //             params: {
                //                 mobile: values.phone,
                //                 code: values.code,
                //                 password: values.password,
                //             },
                //         }))


                //     } else {
                //         // sessionStorage.token = "";
                //         // sessionStorage.mobile = "";
                //     }
                // })
                this.props.dispatch(register({
                    url: '/register',
                    params: {
                        mobile: values.phone,
                        code: values.code,
                        password: values.password,
                    },
                }))


            }

        });
    };

    start = () => {
        if (this.state.count > 1) {
            this.setState({
                count: --this.state.count,
                txt: `剩余 ${this.state.count} 秒`,
                codeFlag: false,
                toggle: false
            })
        } else {
            clearInterval(timer);
            timer = null;
            this.setState({
                count: 60,
                txt: '发送验证码',
                codeFlag: true,
                toggle: true
            })
        }
    }
    computedTime = () => {
        this.start();
        timer = setInterval(this.start, 1000);
    }

    hanleSendCode = () => {
        //发送验证码
        this.computedTime()
        axios.post("/aly/sendSms", {
            mobile: this.mobile.state.value
        }).then(res => {

        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
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
                            })(<Input ref={el => this.mobile = el} style={{ width: '100%' }} />)}
                        </Form.Item>
                        <Form.Item
                            label="验证码"
                        >
                            <Row gutter={8}>
                                <Col span={12}>
                                    {getFieldDecorator('code', {
                                        rules: [
                                            { required: true, message: '请输入验证码' },
                                            { validator: this.checkCode }
                                        ],
                                    })(<Input />)}
                                </Col>
                                <Col span={12}>
                                    <Button disabled={!this.state.codeFlag} onClick={this.hanleSendCode} type="primary" className="btn">{this.state.txt}</Button>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item label="密码" >
                            {getFieldDecorator('firstPassword', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入密码',
                                    },
                                    {
                                        validator: this.validateToNextPassword,
                                    },
                                ],
                            })(<Input.Password />)}
                        </Form.Item>

                        <Form.Item label="确认密码">
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请确认密码',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                ],
                            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                        </Form.Item>
                        <div>
                            <Button className="btn" type="primary" htmlType="submit">注册</Button>
                            <Button className="btn" type="primary" style={{ marginLeft: 8 }}
                                onClick={() => window.history.back()}>返回</Button>
                        </div>
                    </Form>
                </div>

            </div>

        )
    }
}

SignUp = Form.create()(SignUp);
export default SignUp;