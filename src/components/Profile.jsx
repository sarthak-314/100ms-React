import React, {useState, useEffect} from 'react'
import { Typography, Divider, Image } from 'antd';
import axios from 'axios'

const { Title, Paragraph, Text, Link } = Typography;

const blockContent = `YAA`;

const Profile = ({character}) => {
    const [quotes, setQuotes] = useState([])
    useEffect(() => {
        const author = character.name.split(' ').join('+')
        axios.get('https://www.breakingbadapi.com/api/quote?author='+author)
        .then(res => setQuotes(res.data))
        .catch(err => console.log(err))
    }, [])

return(
  <Typography>
    <Image
      width={200}
      src={character.img}
    />
    <Title>{character.name}</Title>
    <Paragraph>
    </Paragraph>

      <Title strong level={4}> Date Of Birth : </Title>
      <Title level={4}> {character.birthday} </Title>
      <Divider />

    <Title strong level={4}> Status : </Title>
      <Title level={4}> {character.status} </Title>
      <Divider />
      
      <Title strong level={4}> Date Of Birth : </Title>
      <Title level={4}> {character.birthday} </Title>
      <Divider />
      
      <Title strong level={4}> Appears in Seasons : </Title>
      <Title level={4}> {character.appearance.map(s => ' '+s+' ' )} </Title>
      <Divider />

      <Title strong level={4}> Quotes by {character.name} : </Title>
      {quotes.map((q, index) =>  index+1 + '. '+q.quote + ' | ')}

  </Typography>
  )
};

export default Profile