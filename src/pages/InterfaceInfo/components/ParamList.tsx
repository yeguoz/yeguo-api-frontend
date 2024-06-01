import { Table } from 'antd';
import React from 'react';
//@ts-ignore
const ParamList: React.FC = ({columns,data}) => {
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} size='small'/>
    </div>
  );
};

export default ParamList;
