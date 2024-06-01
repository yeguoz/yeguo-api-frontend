import Search from 'antd/es/input/Search'
import React from 'react'

export default function DebugRequest({method,invoking,url}:{method:string,invoking:any,url:string}) {
  return (
    <div style={{textAlign:'center'}}>
     <Search
      size={"large"}
      addonBefore={method}
      style={{ width: 500,height:50 }}
      enterButton="发送请求"
      onSearch={invoking}
      value={url}
    />
    </div>
  )
}
