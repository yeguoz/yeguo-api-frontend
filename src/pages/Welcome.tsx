import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <Card
      style={{
        borderRadius: 8,
      }}
      bodyStyle={{
        backgroundImage:
          initialState?.settings?.navTheme === 'realDark'
            ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
            : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
      }}
    >
      <div
        style={{
          backgroundPosition: '100% -30%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '274px auto',
          backgroundImage:
            "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
        }}
      >
        <div
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: token.colorTextHeading,
          }}
        >
          🎉欢迎使用YGAPI开放平台🚀
        </div>
        <p
          style={{
            fontSize: '16px',
            color: token.colorTextSecondary,
            lineHeight: '22px',
            marginTop: 16,
            marginBottom: 32,
            width: '65%',
          }}
        >
          <strong>
            欢迎来到 <span style={{ color: '#fca92f' }}>YGAPI 开放平台</span>
            🎉！这是一个专为开发者设计的平台，提供一系列强大的 API
            接口，让您轻松访问和使用我们的数据。无论您是开发新应用，还是需要快速获取数据，我们的 API
            都能为您提供强有力的支持。 为了帮助您快速上手，我们还提供了完整的{' '}
            <a
              href="https://apidocs.yeguo.icu/guide/getting-started#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fca92f' }}
            >
              SDK（点击获取）
            </a>
            ，方便您将 API
            集成到您的应用中。我们的开放平台致力于提供高质量、实时的数据，以满足您的各种需求。API
            接口设计简洁易用，文档详尽，让您能够迅速上手。 加入
            <span style={{ color: '#fca92f' }}>YGAPI 开放平台</span>，让我们共同创造更多可能性!
          </strong>
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <InfoCard
            index={1}
            href="https://apidocs.yeguo.icu"
            title="📚 文档支持"
            desc="📚我们的官方文档支持，为您提供全面的技术指导和帮助，确保您轻松解决问题并顺利使用我们的产品和服务。"
          />
          <InfoCard
            index={2}
            title="🚀 SDK快速开始"
            href="https://apidocs.yeguo.icu/guide/getting-started#-%E5%AE%89%E8%A3%85"
            desc="🚀提升开发效率，SDK 提供了一套完善的开发工具和接口，使得您可以在短时间内实现功能集成，显著缩短开发周期。"
          />
          <InfoCard
            index={3}
            title="🐞 在线调试"
            href="https://api.yeguo.icu/interfaceInfo"
            desc="🐞通过我们的在线调试工具快速访问接口，提高开发效率。帮助您轻松解决问题，确保您的应用程序顺利运行。"
          />
        </div>
      </div>
    </Card>
  );
};

export default Welcome;
