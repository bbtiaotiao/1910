import React, { Component } from "react";
import { HashRouter, Route, NavLink, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Badge, Popover, Tag } from 'antd';
import { connect } from "react-redux";
import {axios} from "&";
import Info from "../user/info";
import AddressList from "../user/addresslist";
import Subordinate from "../date/subordinate";
import MyDate from "../date/mydate";
import NoMatch from '../noMatch';
import GroupList from "../group";
import Echarts from "../echart";


const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const breadcrumbNameMap = {
    '/home': 'home',
    '/home/info': '个人中心',
    '/home/addressList': '通讯录',
    '/home/mydate': '我的日报',
    '/home/subordinate': '下属日报',
    '/home/group': '部门管理',
    '/home/echarts': 'Echarts'
};
let menu = (
    <Menu>
        <Menu.Item key="out" onClick={() => {
            sessionStorage.clear();
            window.location.href = window.location.origin;
        }}>退出</Menu.Item>
    </Menu>
);

@connect()
class Home extends Component {
    constructor() {
        super();
        this.state={
            mobile:null
        }
    }


    componentDidMount(){
        axios.post("/getMobile")
        .then(res=>{
            this.setState({
                mobile:res.data.result
            })
        })
    }

    render() {
        const {
            mobile
        }=this.state
        const { location } = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            )
        });
        const breadcrumbItems = [(
            <Breadcrumb.Item key="home">
                <Link to="/home" />
            </Breadcrumb.Item>
        )].concat(extraBreadcrumbItems);
        return (
            <div>
                <HashRouter>
                    <Layout style={{ minHeight: '100VH' }}>
                        <Sider width="256px" style={{ boxShadow: '2px 0 6px rgba(0,21,41,.35)', minHeight: '100vh' }}>
                            <div style={{
                                color: '#1890ff',
                                height: '70px',
                                fontSize: '20px',
                                lineHeight: '50px',
                                textAlign: 'center'
                            }}>
                                {/* <img style={{marginBottom: '-20px'}} src={`${this.state.logo}`} alt=""/> */}
                            </div>
                            <Menu theme="dark" defaultSelectedKeys={['info']} defaultOpenKeys={['mine']}
                                mode="inline">
                                <SubMenu
                                    key="mine"
                                    title={<span><Icon type="user" />个人中心</span>}
                                >
                                    <Menu.Item key="info">
                                        <NavLink exact to='/home/info'>
                                            个人资料
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key='addressList'>
                                        <NavLink exact to='/home/addressList'>
                                            通讯录
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key='echarts'>
                                        <NavLink exact to='/home/echarts'>
                                            Echarts
                                        </NavLink>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="workdate"
                                    title={<span><Icon type="schedule" />工作日报</span>}
                                >
                                    <Menu.Item key="mydate">
                                        <NavLink exact to='/home/mydate'>
                                            我的日报
                                        </NavLink>
                                    </Menu.Item>
                                    {sessionStorage.usertype == 1 ? (<Menu.Item key='subordinate'>
                                        <NavLink exact to='/home/subordinate'>
                                            我的下属日报
                                        </NavLink>
                                    </Menu.Item>) : ''}
                                </SubMenu>
                                <Menu.Item key='group'>
                                    <NavLink exact to='/home/group'>
                                        部门管理
                                        </NavLink>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header
                                style={{
                                    height: 54,
                                    background: '#fff',
                                    padding: 0,
                                    boxShadow: '0 1px 4px rgba(0,21,41,.08)'
                                }}>
                                <Dropdown overlay={menu}>
                                    <div className="ant-dropdown-link"
                                        style={{
                                            float: 'right',
                                            marginRight: 30,
                                            color: '#40a9ff',
                                            cursor: 'pointer',
                                            fontSize: 16
                                        }}>
                                        {mobile} <Icon type="down" style={{ fontSize: 16 }} />
                                    </div>
                                </Dropdown>
                                <div style={{ height: 54, display: 'inline-block', float: 'right', marginRight: 30 }}>
                                    <Badge offset={[10, -10]} count={2}>
                                        <Icon type="bell"
                                            style={{ cursor: 'pointer', fontSize: 16 }} />
                                    </Badge>
                                </div>
                            </Header>
                            <Content style={{ margin: '0 16px' }}>
                                <Breadcrumb style={{ margin: '4px 0' }}>
                                    {breadcrumbItems}
                                </Breadcrumb>
                                <div
                                    style={{ padding: 24, background: '#fff', minHeight: '600px', position: 'relative' }}>
                                    <Switch>
                                        <Route exact path="/home" component={Info} />
                                        <Route path="/home/info" component={Info} />
                                        <Route path="/home/addressList" component={AddressList} />
                                        <Route path="/home/mydate" component={MyDate} />
                                        <Route path="/home/subordinate" component={Subordinate} />
                                        <Route path="/home/group" component={GroupList} />
                                        <Route path="/home/echarts" component={Echarts} />
                                        <Route component={NoMatch} />
                                    </Switch>
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                                版权
                            </Footer>
                        </Layout>
                    </Layout>

                </HashRouter>
            </div>
        )
    }
}

export default Home;