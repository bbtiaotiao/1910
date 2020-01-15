

import React, { Component } from "react";
import { Form, Input, Button,Select } from 'antd';
import { axios } from "../../../../utils/axios";
import { updateMyDate } from "../../../actions";
import { connect } from "react-redux";

const { TextArea } = Input;

const FormItem = Form.Item;


@connect()
class UpdateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
    }
    componentDidMount() {
        this.getUserList();
        let value = this.props.setOne;
        // console.log(value);
        this.props.form.setFieldsValue({
            group_name: value.group_name,
            manSelect: value.group_man_name
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post("/updateGroup", {
                    group_name: values.group_name,
                    group_man_name: this.state.userList.filter(
                        item => item.mobile == values.manSelect
                    )[0].name,
                    group_man_mobile: values.manSelect,
                    _id: this.props.setOne._id
                }).then(({ data }) => {
                this.props.close();
                });
            }
        });
    }

    getUserList = () => {
        axios.post("/getOtherInfo", { mobile: sessionStorage.mobile })
            .then(res => {
                this.setState({
                    userList: res.data.result
                })
            })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="部门名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('group_name', {
                        rules: [{
                            required: true, message: `请输入内容`
                        }],
                    })(
                        <Input style={{ width: 200 }} type="text" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem
                    label="部门主管"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('manSelect', { rules: [{ required: true, message: '请选择部门负责人' }] })(
                            <Select
                                placeholder={'请选择部门负责人'}
                            >
                                {
                                    this.state.userList.length > 0 ?
                                        this.state.userList.map((item, index) => (
                                            <Select.Option key={index} value={item.mobile}>{item.name}</Select.Option>
                                        )) : null
                                }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit"> 提交</Button>
                </FormItem>
            </Form>

        )
    }
}


UpdateGroup = Form.create()(UpdateGroup);

export default UpdateGroup;
