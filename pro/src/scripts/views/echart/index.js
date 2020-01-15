
import React, { Component } from "react";
import { Button, Table, Modal, Input } from 'antd';
import ReactDom from 'react-dom';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import { axios } from "&";
import { connect } from "react-redux";
@connect()
class Echarts extends Component {
    constructor() {
        super();
        this.state = {
            peopleList: {}
        };
    }

    componentDidMount() {
        this.getData();
        this.myEchartsPie();
    }

    myEchartsPie = () => {
        const myPie = echarts.init(ReactDom.findDOMNode(this.refs.pie));
        const optionPie = {
            color: ['#2dd4ff', '#db4d4c',],
            textStyle: {
                color: '#000'
            },
            title: {
                text: '男女比例饼状图',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            legend: {
                // orient: 'vertical',
                left: 'center',
                bottom: 10,
                data: ['Man', 'Women'],
                textStyle: {
                    color: '#eee',
                    fontSize: 14
                },
                itemGap: 50,
                itemHeight: 14,
                itemWidth: 14,
                formatter: '{name}'
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '65%'],
                    center: ['50%', '40%'],
                    labelLine: {
                        show: true,
                        length2: 30,
                        length: 0,
                        // smooth:true
                    },
                    label: {
                        show: true,
                        fontSize: 17
                    },
                    data: [
                        { value: this.state.peopleList.man, name: 'Man' },
                        { value: this.state.peopleList.women, name: 'Women' },
                    ],
                }
            ],

        };
        myPie.setOption(optionPie)
    }

    getData = () => {
        axios.post("/echarts")
            .then(res => {
                this.setState({
                    peopleList:{
                        man:res.data.result.man,
                        women:res.data.result.women
                    }
                },() => {
                    this.myEchartsPie();
                })
            })
    }
    render() {
        return (
            <div>
                <div style={{ width: 600, height: 600, margin: "50px auto 0" }} ref='pie'>

                </div>
            </div>
        )
    }
}

export default Echarts;