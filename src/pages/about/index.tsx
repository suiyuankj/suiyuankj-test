import React from 'react';
import { Typography, Card } from '@arco-design/web-react';

function About() {
  return (
    <Card style={{ height: '80vh' }}>
      <Typography.Title heading={6}>
        关于我们
      </Typography.Title>
      <Typography.Text>
        使用Tab按钮，
        设置，简介，视频，地图，资质获奖，发展路程


      </Typography.Text>
    </Card>
  );
}

export default About;
