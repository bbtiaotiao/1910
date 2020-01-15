import React, { Component } from "react";
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { addMyDate } from "../../actions";
import { connect } from "react-redux";

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';


@connect()
class AddDate extends Component {

    constructor(){
        super();
        this.state={
            date:null,
            value:null,
            visible:null
        }
    }

    onChange=(date, dateString)=>{
        this.setState({
            date:dateString
        })
    }
    handleChange=(value)=>{

        this.setState({
            value:value
        })
    }

    handleSubmit = (e) => {
        let value=this.state.value,
        date=this.state.date;
        console.log(value,date)
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.dispatch(addMyDate({
                    url: '/addDate',
                    params: {
                        types: value,
                        content: values.content,
                        date:date,
                        mobile:sessionStorage.mobile
                    }
                }))
            }
        });
    }

    closeCreateAccount = () => {
        this.setState({
            visible: false
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this.state);
        return (
            <Form onSubmit={this.handleSubmit}  style={{
                width: 700
            }}>
                <FormItem
                    label="日报类型"
                    labelCol={{ span: 6 }}
                >
                    {getFieldDecorator('types', {
                        rules: [{
                            required: true, message: `请输入日报类型`
                        }, {
                            validator: this.branch
                        }],
                    })(
                        <Select placeholder="请选择日报类型" style={{ width: 200 }} onChange={this.handleChange}>
                            <Option value="日报">日报</Option>
                            <Option value="周报">周报</Option>
                            <Option value="月报">月报</Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem

                    label="日期"
                    labelCol={{ span: 6 }}
                >
                    {/* {getFieldDecorator('date', {
                        rules: [{
                            required: true, message: `请输入日期`
                        }, {
                            validator: this.date
                        }],
                    })(
                        <DatePicker format={dateFormat} />
                    )} */}
                    <DatePicker placeholder="请选择日期" onChange={this.onChange} />
                </FormItem>

                <FormItem
                    label="内容"
                    labelCol={{ span: 6 }}
                >
                    {getFieldDecorator('content', {
                        rules: [{
                            required: true, message: `请输入内容`
                        }, {
                            validator: this.name
                        }],
                    })(
                        <TextArea rows={6} style={{ width: 200 }} type="text" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                    <Button onClick={this.closeCreateAccount}  type="primary" htmlType="submit"> 提交</Button>
                </FormItem>
            </Form>

        )
    }
}

AddDate = Form.create()(AddDate);

export default AddDate;