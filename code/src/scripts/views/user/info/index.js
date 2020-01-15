import "./index.scss";
import React, { Component } from "react";


import { axios } from "&";

import { Button, Table, Form, Input, Modal, Select } from 'antd';
import { getUserInfo } from "../../../actions";
import { connect } from "react-redux";
import Update from "./update";
import { userInfo } from "../../../actions";

const FormItem = Form.Item;

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};
@connect(
    (state) => {
        console.log(state);
        return {
            ...state,
        }
    },
    dispatch => {
        return {
            getUserInfo: payload => dispatch(getUserInfo(payload))
        }
    }
)
class Info extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            addVisible: false,
            isLogin: !!sessionStorage.mobile,
            list: [],
            setOne: {},
            userList: [],
            groupList: []
        };
        this.columns = [
            {
                title: '部门',
                dataIndex: 'branch',
                key: 'branch',
                render: (text, record) => {
                    return (
                        <span>{this.state.groupList.filter(item => item._id === record.branch)[0] && this.state.groupList.filter(item => item._id === record.branch)[0].group_name}</span>
                    )
                }
                // render: text => <a>{text}</a>,
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: "name"
                // render: text => <a>{text}</a>,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: "sex"
            },
            {
                title: '职位',
                dataIndex: 'post',
                key: "post"
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: "mobile"
            },
            {
                title: 'ID',
                dataIndex: 'uid',
                key: "id"
            },
            (() => {
                let _json = {
                    title: '操作',
                    dataIndex: 'action',
                    key: 'action',
                    render: (text, record) => {
                        return (
                            <span
                                style={{ cursor: 'pointer', color: '#1890ff' }}
                                onClick={
                                    () => (this.setState({ visible: true, setOne: record }))
                                }
                            >
                                修改
                            </span>
                        )
                    }
                }
                return _json;
            })()
        ];
    }

    componentDidMount() { //parmas是对象
        this.getGroupList();
        this.getData();
    }

    getData = () => {
        axios.post("/getUserInfo", { mobile: sessionStorage.mobile })
            .then(res => {
                // console.log(res.data.result);
                const result = res.data.result;
                this.setState({
                    list: result
                })
            })
    }

    openCreateAccount = (record = {}) => {
        this.setState({
            addVisible: true,
            // userMsg: record
        })

    };

    closeCreateAccount = () => {
        this.setState({
            visible: false
        }, () => {
            this.getData();
        })
    };
    closeAddModal = () => {
        this.setState({
            addVisible: false
        }, () => {
            this.getData();
        })
    };

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
                // console.log('Received values of form: ', values); 这里要改,dispatch is on defind

                axios.post("/userInfo", {
                    mobile: values.mobile,
                    branch: values.branch,
                    sex: values.sex,
                    post: values.post,
                    name: values.name,
                }).then(res => {

                })

                // this.props.dispatch(userInfo({
                //     url: '/userInfo',
                //     params: {
                //         mobile: values.mobile,
                //         branch: values.branch,
                //         sex: values.sex,
                //         post: values.post,
                //         name: values.name,
                //     }
                // }))
            }
        });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {sessionStorage.usertype == 0 ? <Button onClick={this.openCreateAccount} type="primary">新增员工</Button> : ''}
                {/* <Button onClick={this.openCreateAccount} type="primary">新增个人资料</Button> */}
                {/* <Modal
                    visible={this.state.visible}
                    onCancel={this.closeCreateAccount}
                    // footer={null}
                    // destroyOnClose={true} width={800}
                    footer={null}
                >
                    <Add  close={this.closeCreateAccount} getAccountList={this.getAccountList} />
                </Modal> */}

                <Modal
                    visible={this.state.visible}
                    onCancel={this.closeCreateAccount}
                    // footer={null}
                    // destroyOnClose={true} width={800}
                    footer={null}
                >
                    <Update setOne={this.state.setOne} close={this.closeCreateAccount} getAccountList={this.getAccountList} />
                </Modal>
                <Modal
                    visible={this.state.addVisible}
                    onCancel={this.closeAddModal}
                    // footer={null}
                    // destroyOnClose={true} width={800}                    这里就是add啊,昨天跟你写了的啊,还有先不用redux,搞的一团糟.用了的就先算了.可以了
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
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
                        </FormItem>
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
                                <Input style={{ width: 200 }} type="text" onBlur={this.handleConfirmBlur} />
                            )}
                        </FormItem>

                        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit"> 提交</Button>
                        </FormItem>
                    </Form>
                </Modal>
                <Table
                    rowKey={'table'}
                    rowSelection={rowSelection}
                    columns={this.columns}
                    dataSource={this.state.list}
                // pagination={this.state.pagination}
                // onChange={this.handleTableChange}
                >
                </Table>
            </div>
        )
    }
}

Info = Form.create()(Info);
export default Info;