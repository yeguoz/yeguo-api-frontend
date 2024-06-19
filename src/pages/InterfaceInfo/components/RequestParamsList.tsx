import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import React, { useEffect } from 'react';

type DataSourceType = {
  id: React.Key;
  name?: string;
  value?: string;
};

export default () => {
  const { data, setData } = useModel('dataModel');

  useEffect(() => {
    setData([]); // 设置 data 为 null
  }, [window.location.href]); // 监听 window.location.href 的变化
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '参数名称',
      dataIndex: 'name',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: '参数值',
      dataIndex: 'value',
      key: 'value',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setData(data.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        headerTitle=""
        columns={columns}
        rowKey="id"
        scroll={{
          x: 960,
        }}
        value={data}
        onChange={setData}
        editable={{
          type: 'multiple',
          // 保留保存和取消
          actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
        }}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
      />
    </>
  );
};
