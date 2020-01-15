import "./index.scss";
import React, { Component } from "react";
import { Button, Table, Modal, Input } from 'antd';

import { axios } from "&";
import { connect } from "react-redux";

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
class Subordinate extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            isLogin: !!sessionStorage.mobile,
            list: [],
            nameOrNum: null, // 搜索框里用来搜索的关键字
        };
        this.columns = [
            {
                title: '类型',
                dataIndex: 'types',
                key: "types"
            },
            {
                title: '日期',
                dataIndex: 'date',
                key: "date"
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
        ];

    }

    componentDidMount() {
        // axios.post("/getOtherInfo", { mobile: sessionStorage.mobile })
        //     .then(res => {
        //         this.setState({
        //             list: res.data.result
        //         })
        //     })
        this.getData();
    }

    getData = () => {
        console.log('adsfdsg')
        axios.post('/getLowDate',{
            mobile: sessionStorage.mobile
        }).then(
            res => {
                this.setState({
                    list: res.data.result
                })
            }
        )
    }

    render() {
        return (
            <div>
                <Table
                    rowKey={'table'}
                    // rowSelection={rowSelection}s
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

export default Subordinate;