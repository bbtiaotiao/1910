import "./index.scss";
import React, { Component } from "react";
import { Button, Table, Modal, Input,Icon  } from 'antd';

import {axios} from "&"

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

const Search = Input.Search;
class AddressList extends Component {
    componentDidMount(){
        this.getGroupList();
        axios.post("/getOtherInfo",{ mobile: sessionStorage.mobile })
        .then(res=>{
            console.log(res);
            this.setState({
                list:res.data.result
            })
        })
    }

    getGroupList = () => {
        axios.post("/getGroup")
            .then(res => {
                console.log(res);
                this.setState({
                    groupList: res.data.result,
                })
            });
    };

    constructor() {
        super();
        this.state = {
            visible: false,
            isLogin: !!sessionStorage.mobile,
            list: [],
            nameOrNum: null, // 搜索框里用来搜索的关键字
            groupList: [],
        };
        this.columns = [
            {
                title: '部门',
                dataIndex: 'branch',
                key:'branch',
                render: (text, record) => {
                    return (
                    <span>{this.state.groupList.filter(item => item._id === record.branch)[0]&&this.state.groupList.filter(item => item._id === record.branch)[0].group_name}</span>
                    )
                }
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key:'name',
            },
            {
                title: '职位',
                dataIndex: 'post',
                key:'post',
                // filters:[
                //     {
                //         text: 'UI',
                //         value: 'UI',
                //       },
                //       {
                //         text: '前端开发',
                //         value: '前端开发',
                //       },
                //       {
                //         text: '人事',
                //         value: '人事',
                //       },
                // ],
                // onFilter: (value, record) => record.post.indexOf(value) === 0,
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key:'mobile',
            },
        ];
    }
    render() {
        return (
            <div>

                {/* <Button style={{ marginLeft: 10, float: "right" }} title={"搜索"}
                    icon='download'
                    type='primary' onClick={this.exportRecord} />
                <Search
                    placeholder="请输入关键字"
                    // onSearch={this.searchByNameOrNum}
                    enterButton
                    style={{ width: 240, float: "right" }}
                onChange={(e) => this.setState({nameOrNum: e.target.value})}
                value={this.state.nameOrNum}
                /> */}
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

export default AddressList;