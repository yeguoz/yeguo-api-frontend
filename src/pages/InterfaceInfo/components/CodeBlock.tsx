import parserJson from 'prettier/parser-babel';
import prettier from 'prettier/standalone';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlock = ({ language = 'json', value }: { language?: string; value?: any }) => {
  let formattedCode;
  try {
    formattedCode = prettier.format(value, {
      parser: 'json',
      plugins: [parserJson],
    });
  } catch (error: any) {
    console.log('格式化失败', error.message);
    formattedCode = value; // 如果格式化失败，显示原始代码
  }

  return (
    <SyntaxHighlighter language={language} style={github} showLineNumbers>
      {formattedCode}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
