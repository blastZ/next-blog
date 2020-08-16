import PrismHighlight, { defaultProps } from 'prism-react-renderer';

import theme from 'prism-react-renderer/themes/vsDark';

export default function Highlight ({ children, className }) {
  const language = className.replace(/language-/, '');

  return (
    <PrismHighlight {...defaultProps} code={children} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            padding: 0,
            margin: 0,
            background: '#1E1E1E',
            fontSize: 16
          }}>
          {tokens.slice(0, tokens.length - 1).map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </PrismHighlight>
  );
};
