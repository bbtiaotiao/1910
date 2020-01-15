
import React, { Component } from "react";
import { Form, Input, Button, Select } from 'antd';
import { userInfo } from "../../../../actions";
import { axios } from "&";
const FormItem = Form.Item;
class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupList: []
        };
    }
    componentDidMount() {
        this.getGroupList();
        let value = this.props.setOne;
        this.props.form.setFieldsValue(
            {
                groupSelect: value.branch,
                name: value.name,
                sex: value.sex,
                post: value.post,
                mobile: value.mobile + ""
            }
        )
    }

    getGroupList = () => {
        axios.post("/getGroup")
            .then(res => {
                this.setState({
                    groupList: res.data.result,
                })
            });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // this.props.dispatch(userInfo({
                //     url: '/updateUserInfo',
                //     params: {
                //         mobile: values.mobile,
                //         branch: values.groupSelect,
                //         sex: values.sex,
                //         post: values.post,
                //         name: values.name,
                //     }
                // }))
                axios.post("/updateUserInfo", {
                    mobile: values.mobile,
                    branch: values.groupSelect,
                    sex: values.sex,
                    post: values.post,
                    name: values.name,
                }).then(res => {
                    this.props.close();
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                {sessionStorage.usertype != 0 ? (<FormItem
                    label="部门"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('groupSelect', { rules: [{ required: true, message: '请选择部门负责人' }] })(
                            <Select
                                placeholder={'请选择部门'}
                            >
                                {
                                    this.state.groupList.length > 0 ?
                                        this.state.groupList.map((item, index) => (
                                            <Select.Option key={index} value={item._id}>{item.group_name}</Select.Option>
                                        )) : null
                                }
                            </Select>
                        )
                    }
                </FormItem>) : ''}

                <FormItem
                    label="姓名"
                    {...formItemLayout}
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
                    {...formItemLayout}
                >
                    {getFieldDecorator('sex', {
                        rules: [{
                            required: true, message: `请输入性别`
                        }],
                    })(
                        <Select
                            placeholder={'请选择性别'}
                        >
                            <Select.Option key={1} value='man'>man</Select.Option>
                            <Select.Option key={1} value='women'>women</Select.Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem

                    label="职位"
                    {...formItemLayout}
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
                    {...formItemLayout}
                >
                    {getFieldDecorator('mobile', {
                        rules: [{
                            required: true, message: `请输入手机号`
                        }, {
                            validator: this.mobile
                        }],
                    })(
                        <Input style={{ width: 200 }} disabled onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem wrapperCol={{ span: 12, offset: 6 }}>

                    <Button type="primary" htmlType="submit"> 提交</Button>

                </FormItem>
            </Form>

        )
    }
}

Update = Form.create()(Update);

export default Update;