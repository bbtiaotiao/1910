import React, { Component } from "react";

import { Button, Table, Select, Tag, Modal, Input, Form } from 'antd';
import UpdateGroup from "./updateGroup";
import { axios } from "../../../utils/axios";
import { connect } from "react-redux";

const { Search } = Input;
const FormItem = Form.Item;

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};


@connect()
class GroupList extends Component {

    constructor() {
        super();
        this.state = {
            visible: false,
            addvisible: false,
            isLogin: !!sessionStorage.mobile,
            list: [],
            setOne: {},
            value: "",
            pagination: {
                total: "",
                pageSize: 10,
                current: 1,
                defaultCurrent: 1,
                showTotal: (total) => `总共 ${total} 条`
                // showQuickJumper: true,   
                // showSizeChanger: true,
            },
            userList: []
        };
        this.columns = [
            {
                title: '部门名称',
                dataIndex: 'group_name',
                key: "types"
            },
            {
                title: '部门主管',
                dataIndex: 'group_man_name',
                key: "group_man_name"
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

    openCreateAccount = (record = {}) => {
        this.setState({
            addvisible: true
            // userMsg: record
        })
    };

    closeCreateAccount = () => {
        this.setState({
            addvisible: false
        })
    };

    closeAccount = () => {
        this.setState({
            visible: false
        },
            this.getData()
        );
    }
    componentDidMount() {
        this.getData();
        this.getUserList();
    }

    getData = () => {
        axios.post("/getGroup")
            .then(res => {
                this.setState({
                    list: res.data.result,
                    total: res.data.result.length - 1,
                })
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

    onChange = (page) => {
        this.setState({
            current: page,
        });
    }


    handleSearch = (value) => {
        console.log(value);
        this.setState({
            value: value
        })
        this.getData()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let group_man_name = this.state.userList.filter(
                    item => item.mobile == values.manSelect
                )
                axios.post("/addGroup", {
                    group_name: values.groupName,
                    group_man_name: this.state.userList.filter(
                        item => item.mobile == values.manSelect
                    )[0].name,
                    group_man_mobile: values.manSelect,
                }).then(({ data }) => {
                    if (data.code === 200) {
                        this.closeCreateAccount();
                        this.getData();
                    };
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
            <div>
                {/* 新增部门 */}
                <Button onClick={this.openCreateAccount} type="primary">新增</Button>
                <Modal
                    visible={this.state.addvisible}
                    onCancel={this.closeCreateAccount}
                    footer={null}
                    // destroyOnClose={true} width={800} 
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            label="部门名称"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('groupName', {
                                rules: [{
                                    required: true, message: `请输入部门名称`
                                }, {
                                    validator: this.branch
                                }],
                            })(
                                <Input style={{ width: 200 }} type="text" />
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
                </Modal>

                {/* <Search
                    placeholder="内容或操作人"
                    onSearch={(value) => this.handleSearch(value)}
                    enterButton
                    style={{ width: 350, float: "right" }}
                    onChange={(e) => this.setState({ value: e.target.value })}
                    value={this.state.value}
                ></Search> */}


                {/* 修改部门 */}
                <Modal
                    visible={this.state.visible}
                    onCancel={this.closeAccount}
                    footer={null}
                    // destroyOnClose={true} width={800}
                    footer={null}
                >
                    <UpdateGroup setOne={this.state.setOne} close={this.closeAccount} />
                </Modal>

                <Table
                    rowKey='table'
                    rowSelection={rowSelection}
                    columns={this.columns}
                    dataSource={this.state.list}
                    pagination={this.state.pagination}
                    onChange={this.onChange}
                // onChange={this.handleTableChange}
                >
                </Table>

            </div>
        )
    }
}

GroupList = Form.create()(GroupList);

export default GroupList;