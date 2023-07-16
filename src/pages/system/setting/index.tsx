import React from 'react';
import { Typography, Card } from '@arco-design/web-react';

function Setting() {
  return (
    <Card style={{ height: '80vh' }}>
      <Typography.Title heading={6}>
        系统设置
      </Typography.Title>
      <Typography.Text>You can add content here :)</Typography.Text>
    </Card>
  );
}

export default Setting;
