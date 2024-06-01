import { useModel } from '@umijs/max';

export default function TipUtil(props: any) {
  const { initialState } = useModel('@@initialState');
  const color = initialState?.settings?.colorPrimary;

  return (
    <div style={{ paddingTop: 10, paddingBottom: 10, display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          height: 16,
          width: 5,
          backgroundColor: color,
          borderRadius: 5,
          display: 'inline-block',
          marginRight: 5,
        }}
      />
      <span
        style={{
          color: '#2b88d8',
        }}
      >
        {props.text}
      </span>
    </div>
  );
}
