// Storybook stories for theme tokens
import { colors, fontSizes } from './theme.js';

export default {
  title: 'Design Tokens/Theme',
};

export const Colors = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
    {Object.entries(colors).map(([key, value]) => (
      <div key={key} style={{ textAlign: 'center' }}>
        <div style={{ background: value, width: 80, height: 40, borderRadius: 8, border: '1px solid #eee', marginBottom: 8 }} />
        <div style={{ fontSize: 14 }}>{key}</div>
        <div style={{ fontSize: 12, color: '#888' }}>{value}</div>
      </div>
    ))}
  </div>
);

export const FontSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
    {Object.entries(fontSizes).map(([key, value]) => (
      <div key={key} style={{ fontSize: value }}>
        {key}: {value}
      </div>
    ))}
  </div>
);
