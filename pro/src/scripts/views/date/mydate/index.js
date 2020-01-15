import "./index.scss";
import React, { Component } from "react";

import { Button, Table, Divider, Tag, Modal, Input } from 'antd';
import AddDate from "../../addDate";
import { axios } from "../../../../utils/axios";
import UpdateMyDate from "./updateMyDate";
import { connect } from "react-redux";

const { Search } = Input;


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
class MyDate extends Component {

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
                pageSize: 5,
                current: 1,
                defaultCurrent: 1,
                showTotal: (total) => `总共 ${total} 条`
                // showQuickJumper: true,
                // showSizeChanger: true,


            }
        };
        this.columns = [
            {
                title: '类型',
                dataIndex: 'types',
                key: "types"
                // render: text => <a>{text}</a>,
            },
            {
                title: '日期',
                dataIndex: 'date',
                key: "date"
                // render: text => <a>{text}</a>,
            },
            {
                title: '操作人',
                dataIndex: 'name',
                key: "name"
            },
            {
                title: '日志内容',
                dataIndex: 'content',
                key: "content"
            },
            {
                title: '新增时间',
                dataIndex: 'time',
                key: "time"
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
    }

    getData = () => {
        axios.post("/getMyDate", { mobile: sessionStorage.mobile, value: this.state.value })
            .then(res => {
                this.setState({
                    list: res.data.result,
                    total: res.data.result.length - 1,
                })
            });
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



render() {
    return (
        <div>
            {/* 新增日报 */}
            <Button onClick={this.openCreateAccount} type="primary">新增</Button>
            <Modal
                visible={this.state.addvisible}
                onCancel={this.closeCreateAccount}
                footer={null}
                // destroyOnClose={true} width={800} userMsg这是什么大哥,乱写 两个蒙层怎么用同一个函数,乱写
                footer={null}
            >
                <AddDate close={this.closeCreateAccount} />
            </Modal>

            <Search
                placeholder="内容或操作人"
                onSearch={(value) => this.handleSearch(value)}
                enterButton
                style={{ width: 350, float: "right" }}
                onChange = {(e) => this.setState({ value: e.target.value })}
                value = { this.state.value }
            ></Search>


            {/* 修改日报 */}
            <Modal
                visible={this.state.visible}
                onCancel={this.closeAccount}
                footer={null}
                // destroyOnClose={true} width={800}
                footer={null}
            >
                <UpdateMyDate setOne={this.state.setOne} close={this.closeAccount} />
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



export default MyDate;