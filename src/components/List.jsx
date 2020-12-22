import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const BASE_URL = "https://www.breakingbadapi.com/api/"
const BreakingBadList = props => {
    const [characters, setCharacters] = useState([])
    const [listData, setListData] = useState([])

    useEffect(() => {
        axios.get(BASE_URL + "characters")
        .then(res => {
            setCharacters(res.data)
            showCharacters(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    
    const showCharacters =  allCharacters  => { 
        const listDataChars = [];
        for (let i = 0; i < allCharacters.length; i++) {
            const character = allCharacters[i]
            listDataChars.push({
                href: character.img,
                title: character.name,
                avatar: character.img,
                id: i, 
                description:
                `Nickname : ${character.nickname}`,
                content:
                `Actor ${character.portrayed} Plays a ${character.occupation[0]}`, 
            });
        }
        setListData(listDataChars)
    }

    const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
    );

    return (
        <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={listData}

        renderItem={item => (
          <List.Item
            className='list-item'
            onClick={() => props.onClickChar(item.id)}
            key={item.title}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.title}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    )
}

export default BreakingBadList