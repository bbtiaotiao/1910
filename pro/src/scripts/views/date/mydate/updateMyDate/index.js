

import React, { Component } from "react";
import { Form, Input, Button } from 'antd';
import { updateMyDate } from "../../../../actions";
import { connect } from "react-redux";

const { TextArea } = Input;

const FormItem = Form.Item;


@connect()
class UpdateMyDate extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        let value = this.props.setOne;
        // console.log(value);
        this.props.form.setFieldsValue({
            content: value.content,
            time: value.time
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                // console.log('Received values of form: ', values);
                // console.log(values);
                this.props.dispatch(updateMyDate({
                    url: '/updateMyDate',
                    params: {
                        mobile: sessionStorage.mobile,
                        content: values.content,
                        time: values.time
                    }
                })) // 这里还要写回调的 改完要自动关闭蒙层
                this.props.close();

            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} style={{
                width: 700
            }}>
                <FormItem
                    label="时间"
                    labelCol={{ span: 6 }}
                >
                    {getFieldDecorator('time', {
                        rules: [{
                            required: true, message: `请输入内容`
                        }, {
                            validator: this.time
                        }],
                    })(
                        <Input disabled style={{ width: 200 }} type="text" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem
                    label="内容"
                    labelCol={{ span: 6 }}
                >
                    {getFieldDecorator('content', {
                        rules: [{
                            required: true, message: `请输入内容`
                        }, {
                            validator: this.content
                        }],
                    })(
                        <TextArea rows={6} style={{ width: 200 }} type="text" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit"> 提交</Button>
                </FormItem>
            </Form>

        )
    }
}


UpdateMyDate = Form.create()(UpdateMyDate);

export default UpdateMyDate;
