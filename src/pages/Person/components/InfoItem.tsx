import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import copy from '/public/assets/copy.svg';
import edit from '/public/assets/edit.svg';

export default ({ name, value, type }: { name: any; value: any; type?: 'editor' | 'copy' }) => {
  const [flag, setFlag] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLInputElement>(null);

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

  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.05rem' }}>
      <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>{name}:</span>
      {flag === 0 ? (
        <span>{value ? value : '未设置'}</span>
      ) : (
        <input
          ref={inputRef}
          type="text"
          onFocus={() => {
            if (inputRef.current) {
              inputRef.current.value = value;
              inputRef.current.readOnly = false;
            }
          }}
          onBlur={() => setFlag(0)}
        />
      )}
      {type === undefined ? null : (
        <span
          onClick={type === 'editor' ? handleEdit : handleCopy}
          onMouseOver={() => {
            if (type === 'editor' && spanRef.current) {
              // todo 有问题
              spanRef.current.style.display = 'inline-block';
            }
          }}
          style={{
            cursor: 'pointer',
          }}
        >
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
            }}
          >
            {type === 'editor' ? '编辑' : '复制'}
          </span>
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
