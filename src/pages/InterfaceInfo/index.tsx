import { interfaceInfoQuery } from '@/services/yeguo-api/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Card, Col, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';

const InfoCard: React.FC = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const interfaceInfoQueryList = async (params: API.UserQueryParams) => {
    const result = await interfaceInfoQuery(params);
    if (!result.data) {
      message.warning('查询数据为空');
      return;
    }
    setData(result.data);
  };

  useEffect(() => {
    interfaceInfoQueryList({});
  }, []);

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <Row gutter={16}>
        {data.map((item: API.InterfaceInfoVO) => {
          return (
            <Col span={8} key={item.id}>
              <Card
                title={item.name}
         
                bordered={false}
                hoverable={true}
                style={{ marginBottom: 10 }}
                onClick={() => {
                  navigate('detail', {
                    replace: false,
                    state: { ...item },
                  });
                }}
              >
                <img src={item.avatarUrl} alt="" height={60} />
                {item.description}
              </Card>
            </Col>
          );
        })}
      </Row>
    </PageContainer>
  );
};

export default InfoCard;
