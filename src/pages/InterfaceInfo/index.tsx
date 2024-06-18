import Container from '@/components/Container';
import { interfaceInfoQuery } from '@/services/yeguo-api/interfaceInfoController';
import { useNavigate } from '@umijs/max';
import { Col, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import InterfaceInfoCard from './components/InterfaceInfoCard';

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
    console.log(result.data);
  };

  useEffect(() => {
    interfaceInfoQueryList({});
  }, []);

  return (
    <Container>
      <Row>
        {data.map((item: API.InterfaceInfoVO) => {
          return (
            <Col
              key={item.id}
              xs={{
                flex: '100%',
              }}
              sm={{
                flex: '50%',
              }}
              md={{
                flex: '40%',
              }}
              lg={{
                flex: '20%',
              }}
              xl={{
                flex: '5%',
              }}
            >
              <InterfaceInfoCard
                name={item.name}
                description={item.description}
                iconUrl={item.avatarUrl}
                invokingCount={item.invokingCount}
                onClick={() => {
                  navigate('detail', {
                    replace: false,
                    state: { ...item },
                  });
                }}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default InfoCard;
