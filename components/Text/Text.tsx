import style from './Text.module.css';

interface TextProps {
  children: React.ReactNode;
  textAlign?: string;
  color?: string;
  marginBottom?: string;
}

export default function Text({
  children,
  textAlign = '',
  color = '',
  marginBottom = '0',
}: TextProps) {
  return (
    <p
      className={[
        style['text'],
        style[textAlign],
        style[color],
        style[`marginBottom${marginBottom}`],
      ].join(' ')}
    >
      {children}
    </p>
  );
}
