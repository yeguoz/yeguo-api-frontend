import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import copy from '/public/assets/copy.svg';
import edit from '/public/assets/edit.svg';

export default ({
  name,
  value,
  type,
  uniqueKey,
  onValueChange = () => {},
}: {
  name: any;
  value: any;
  type?: 'editor' | 'copy';
  uniqueKey?: string;
  onValueChange?: (uniqueKey: string, value: any) => void;
}) => {
  const [flag, setFlag] = useState(0);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleEdit = () => {
    setFlag(1);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        message.success('复制成功');
      })
      .catch((err) => {
        message.error('复制失败: ', err);
      });
  };

  useEffect(() => {
    if (flag === 1 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [flag]);

  const handleBlur = () => {
    if (inputRef.current) {
      const newValue = inputRef.current.value;
      setInputValue(newValue);
      if (uniqueKey) {
        onValueChange(uniqueKey, newValue); // 通知父组件
      }
    }
    setFlag(0);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.05rem' }}>
      <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>{name}:</span>
      {/* flag 用来控制现实值或者是显示输入框 */}
      {flag === 0 ? (
        <span>{inputValue ? inputValue : '未设置'}</span>
      ) : (
        <input ref={inputRef} type="text" defaultValue={inputValue} onBlur={handleBlur} />
      )}
      {/* 右边复制或编辑图标 */}
      {type === undefined ? null : (
        <span
          onClick={type === 'editor' ? handleEdit : handleCopy}
          onMouseOver={() => {
            if ((type === 'editor' || type === 'copy') && spanRef.current) {
              spanRef.current.style.display = 'inline-block';
            }
          }}
          onMouseLeave={() => {
            if (spanRef.current) {
              spanRef.current.style.display = 'none';
            }
          }}
          style={{
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          {/* 隐藏小提示 */}
          <span
            ref={spanRef}
            style={{
              display: 'none',
              position: 'absolute',
              bottom: '1.875rem',
              backgroundColor: 'skyblue',
              fontSize: '0.8rem',
              color: '#fff',
              padding: '0 0.4rem',
              borderRadius: '0.5rem',
              width: '2.4rem',
              height: '1.3rem',
              textAlign: 'center',
              lineHeight: '1.3rem',
            }}
          >
            {type === 'editor' ? '编辑' : '复制'}
          </span>
          {/* 小图标 */}
          {type === 'editor' ? (
            <img src={edit} alt="edit" style={{ height: '1.5rem' }} />
          ) : (
            <img src={copy} alt="copy" style={{ height: '1.5rem' }} />
          )}
        </span>
      )}
    </div>
  );
};
