
import React, { Component } from "react";
import { Form, Input, Button } from 'antd';
import { userInfo } from "../../actions";

const FormItem = Form.Item;
class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        console.log(this.props.setOne);
        let value = this.props.setOne;
        this.props.form.setFieldsValue(
            {
                branch: value.branch,
                name: value.name,
                sex: value.sex,
                post: value.post,
                mobile: value.mobile + ""
            }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.dispatch(userInfo({
                    url: '/updateUserInfo',
                    params: {
                        mobile: values.mobile,
                        branch: values.branch,
                        sex: values.sex,
                        post: values.post,
                        name: values.name,
                    }
                }))
            }
        });
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //             this.props.dispatch(userInfo({
    //                 url: '/userInfo',
    //                 params: {
    //                     mobile: values.mobile,
    //                     branch: values.branch,
    //                     sex: values.sex,
    //                     post: values.post,
    //                     name: values.name,
    //                 }
    //             }))
    //         }
    //     });
    // }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} style={{
                width: 700
            }}>
                <FormItem
                    label="部门"
                    labelCol={{ span: 6 }}
                >
                    {getFieldDecorator('branch', {
                        rules: [{
                            required: true, message: `请输入所在部门`
                        }, {
                            validator: this.branch
                        }],
                    })(
                        <Input style={{ width: 200 }} type="text" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem
                    label="姓名"
                    labelCol={{ span: 6 }}
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: `请输入姓名`
                        }, {
                            validator: this.name
                        }],
                    })(
                        <Input style={{ width: 200 }} type="text" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem

                    label="性别"
                    labelCol={{ span: 6 }}
                >
                    {getFieldDecorator('sex', {
                        rules: [{
                            required: true, message: `请输入性别`
                        }, {
                            validator: this.sex
                        }],
                    })(
                        <Input style={{ width: 200 }} type="text" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem

                    label="职位"
                    labelCol={{ span: 6 }}
                >
                    {getFieldDecorator('post', {
                        rules: [{
                            required: true, message: `请输入职位`
                        }, {
                            validator: this.post
                        }],
                    })(
                        <Input style={{ width: 200 }} type="text" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem

                    label="手机号"
                    labelCol={{ span: 6 }}
                >
                    {getFieldDecorator('mobile', {
                        rules: [{
                            required: true, message: `请输入手机号`
                        }, {
                            validator: this.mobile
                        }],
                    })(
                        <Input style={{ width: 200 }} onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem wrapperCol={{ span: 12, offset: 6 }}>

                    <Button type="primary" htmlType="submit"> 提交</Button>

                </FormItem>
            </Form>

        )
    }
}

Add = Form.create()(Add);

export default Add;