import { useRef } from 'react';

import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Image, message } from 'antd';
import { userUpdate, userDelete, userSelectAll } from '@/services/yeguo-api/userController';
import { rearg } from 'lodash';

const columns: ProColumns<API.CurrentUser>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'text',
    width: 50,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} height={50} />
      </div>
    ),
    hideInSearch:true,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '女',
        status: 'Processing',
      },
      1: {
        text: '男',
        status: 'Processing',
      },
    },
    hideInSearch:true
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '金币',
    dataIndex: 'goldCoin',
    copyable: true,
  },
  {
    title: '访问key',
    dataIndex: 'accessKey',
    copyable: false,
    width: 20,
    editable:false,
    hideInSearch:true,
  },
  {
    title: '密钥key',
    dataIndex: 'secretKey',
    copyable: false,
    width: 20,
    editable:false,
    hideInSearch:true,
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '正常',
        status: 'Processing',
      },
      1: {
        text: '封禁',
        status: 'Warning',
      },
    },
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '普通用户',
        status: 'Processing',
      },
      1: {
        text: '管理员',
        status: 'Success',
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'date',
    hideInSearch:true,
  },

  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          // @ts-ignore
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,

      <a href={record.avatarUrl} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,

      <a
        key="delete"
        onClick={async () => {
          // @ts-ignore
          const result = await userDelete(record.id);
          // 1成功 -1失败
          const data = result.data;
          console.log("返回值是："+data);
          if (data < 1) {
            message.error('删除失败');
            return;
          }
          message.success('删除成功');
          action?.reload();
        }}
      >
        删除
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.UserVO>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // request 类型 (params?: {pageSize,current},sort,filter) => {data,success,total}
      request={async (params = {}, sort, filter) => {
        console.log(params,sort,filter);
        const result = await userSelectAll();
        const userList = result.data;
        return {
          data: userList,
        };
      }}
      editable={{
        type: 'multiple',
        onDelete:async (rows)=>{ 
          // @ts-ignore
            const result =  await userDelete(rows);
            if(result.data === null) {
              message.error(result.description);
              return;
            }
            message.success("删除成功");
          },
          onSave: async (_,row)=>{ 
            // @ts-ignore
              const result =  await userUpdate(row);
              if(result.data === null) {
                message.error(result.description);
                return;
              }
              console.log(result.data);
              
              message.success("修改成功");
            }
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values: any, type: any) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="用户列表"
    />
  );
};
