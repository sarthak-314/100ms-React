import React, { useState, useEffect } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import List from './List'
import axios from 'axios'
import Profile from './Profile'

const BASE_URL = "https://www.breakingbadapi.com/api/"

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


const CustomLayout = () => {
  const [characters, setCharacters] = useState([])
  const [showProfile, setShowProfile] = useState(false)
  const [showId, setShowId] = useState(0)

  useEffect(() => {
    axios.get(BASE_URL + "characters")
    .then(res => {
        console.log(res)
        setCharacters(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  const onClickChar = id => {
    setShowProfile(true)
    setShowId(id)
  }

  return (
  <Layout>
    <Header className="header">
      <div className="logo" />
      
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1"
          onClick={() => setShowProfile(false)}
          >All Characters</Menu.Item>

          <SubMenu key="sub2" icon={<LaptopOutlined />} title="Character Profiles"
          onClick={() => setShowProfile(true)}
          >
            {
              characters.map((item, index) => <Menu.Item key={index} onClick={() => onClickChar(index)}>{item.name}</Menu.Item>)
            }
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {
            showProfile ? 
            <Profile
            character={characters[showId]}
            /> 
            : 
            <List
            characters={characters}
            onClickChar={onClickChar}
            />
          }
          

        </Content>
      </Layout>
    </Layout>
  </Layout>
)
}

export default CustomLayout

