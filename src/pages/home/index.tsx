import React, { ReactNode, useEffect, useState } from 'react';
import { Typography, Card, Divider, Grid, Skeleton, Table, TableColumnProps } from '@arco-design/web-react';
import { IconCalendar } from '@arco-design/web-react/icon';
import styles from './style/overview.module.less';
import { ReportedData } from '@/service/dashboard';
import Category from './category'
const { Row, Col } = Grid;


type StatisticItemType = {
  icon?: ReactNode;
  title?: ReactNode;
  count?: ReactNode;
  loading?: boolean;
  unit?: ReactNode;
};

function StatisticItem(props: StatisticItemType) {
  const { icon, title, count, loading, unit } = props;
  return (
    <div className={styles.item}>
      <div className={styles.icon}>{icon}</div>
      <div>
        <Skeleton loading={loading} text={{ rows: 2, width: 60 }} animation>
          <div className={styles.title}>{title}</div>
          <div className={styles.count}>
            {count}
            <span className={styles.unit}>{unit}</span>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}


function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  const [reporte, setReporte] = useState<API.Reported>({ day_count: 0, examine_count: 0, apply_count: 0, appear_count: 0, department: [] });
  const [departmentData, setDepartmentData] = React.useState<API.Department[]>([]);

  const now = new Date()

  const fetchData = () => {
    setLoading(true);
    ReportedData().then(rec => {
      setReporte(rec.data)
      setDepartmentData(rec.data.department)
      setLoading(false);
    })

  };


  useEffect(() => {
    fetchData();
  }, []);


  const columns: TableColumnProps[] = [

    {
      title: '测试数据',
      dataIndex: 'weight',
      width: '50px',
    },
    {
      title: '销售数量',
      dataIndex: 'name',
      width: '150px',
      // sorter: (a, b) => a.create_time.length - b.create_time.length,
    },


  ];



  return (
    <Card style={{ height: '80vh' }}>
      <Typography.Title heading={6}>
        统计
      </Typography.Title>


      <Divider />
      <Row>
        <Col flex={1}>
          <StatisticItem
            icon={<IconCalendar />}
            title={"今日上报"}
            count={reporte.day_count}
            loading={loading}
            unit={"条"}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconCalendar />}
            title={"今天审核"}
            count={reporte.examine_count}
            loading={loading}
            unit={"条"}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconCalendar />}
            title={"总审核通过"}
            count={reporte.apply_count}
            loading={loading}
            unit={"条"}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconCalendar />}
            title={"上报总数"}
            count={reporte.appear_count}
            loading={loading}
            unit={"条"}
          />
        </Col>
      </Row>
      <Divider />

      <Row>
        <Col span={18}>
          <div>
            <Category></Category>

          </div>
        </Col>
        <Col span={4}>
          <Card style={{ width: 360 }}
            title='团长TOP10'
          >
            <Table
              columns={columns}
              data={departmentData}
              pagination={false}
            />

          </Card>
        </Col>
      </Row>

    </Card>
  );
}

export default Home;
