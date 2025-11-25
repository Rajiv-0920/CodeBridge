export const THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
]

// Code Editor Theme options
export const THEME_OPTIONS = [
  // Built-in themes
  { id: 'vs-dark', label: 'VS Dark' },
  { id: 'vs', label: 'VS Light' },
  { id: 'hc-black', label: 'High Contrast' },

  // Dark themes
  { id: 'monokai', label: 'Monokai' },
  { id: 'dracula', label: 'Dracula' },
  { id: 'github-dark', label: 'GitHub Dark' },
  { id: 'one-dark-pro', label: 'One Dark Pro' },
  { id: 'night-owl', label: 'Night Owl' },
  { id: 'tokyo-night', label: 'Tokyo Night' },
  { id: 'synthwave-84', label: "Synthwave '84" },
  { id: 'cobalt2', label: 'Cobalt2' },
  { id: 'material-theme', label: 'Material Theme' },
  { id: 'gruvbox-dark', label: 'Gruvbox Dark' },

  // Light themes
  { id: 'github-light', label: 'GitHub Light' },
  { id: 'light-plus', label: 'Light+' },
  { id: 'solarized-light', label: 'Solarized Light' },
  { id: 'quiet-light', label: 'Quiet Light' },
  { id: 'atom-one-light', label: 'Atom One Light' },
  { id: 'winter-is-coming-light', label: 'Winter Is Coming Light' },
  { id: 'gruvbox-light', label: 'Gruvbox Light' },
  { id: 'light-owl', label: 'Light Owl' },
  { id: 'tokyo-night-light', label: 'Tokyo Night Light' },
  { id: 'ayu-light', label: 'Ayu Light' },
]

// Code Editor Themes
// Dark Themes

export const monokaiTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '75715e' },
    { token: 'keyword', foreground: 'f92672' },
    { token: 'string', foreground: 'e6db74' },
    { token: 'number', foreground: 'ae81ff' },
    { token: 'type', foreground: '66d9ef' },
    { token: 'class', foreground: 'a6e22e' },
    { token: 'function', foreground: 'a6e22e' },
  ],
  colors: {
    'editor.background': '#272822',
    'editor.foreground': '#f8f8f2',
    'editorCursor.foreground': '#f8f8f0',
    'editor.selectionBackground': '#49483e',
    'editor.lineHighlightBackground': '#3e3d32',
  },
}

export const draculaTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6272a4' },
    { token: 'keyword', foreground: 'ff79c6' },
    { token: 'string', foreground: 'f1fa8c' },
    { token: 'number', foreground: 'bd93f9' },
    { token: 'type', foreground: '8be9fd' },
    { token: 'class', foreground: '50fa7b' },
    { token: 'function', foreground: '50fa7b' },
  ],
  colors: {
    'editor.background': '#282a36',
    'editor.foreground': '#f8f8f2',
    'editorCursor.foreground': '#f8f8f0',
    'editor.selectionBackground': '#44475a',
    'editor.lineHighlightBackground': '#44475a',
  },
}

export const githubDarkTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '8b949e' },
    { token: 'keyword', foreground: 'ff7b72' },
    { token: 'string', foreground: 'a5d6ff' },
    { token: 'number', foreground: '79c0ff' },
    { token: 'type', foreground: 'd2a8ff' },
    { token: 'class', foreground: 'd2a8ff' },
    { token: 'function', foreground: 'd2a8ff' },
  ],
  colors: {
    'editor.background': '#0d1117',
    'editor.foreground': '#c9d1d9',
    'editorCursor.foreground': '#c9d1d9',
    'editor.selectionBackground': '#163356',
    'editor.lineHighlightBackground': '#161b22',
  },
}

export const oneDarkProTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'c678dd' },
    { token: 'string', foreground: '98c379' },
    { token: 'number', foreground: 'd19a66' },
    { token: 'type', foreground: 'e5c07b' },
    { token: 'class', foreground: 'e5c07b' },
    { token: 'function', foreground: '61afef' },
  ],
  colors: {
    'editor.background': '#282c34',
    'editor.foreground': '#abb2bf',
    'editorCursor.foreground': '#528bff',
    'editor.selectionBackground': '#3e4451',
    'editor.lineHighlightBackground': '#2c313c',
  },
}

export const nightOwlTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '637777', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'c792ea' },
    { token: 'string', foreground: 'ecc48d' },
    { token: 'number', foreground: 'f78c6c' },
    { token: 'type', foreground: 'ffcb8b' },
    { token: 'class', foreground: 'ffcb8b' },
    { token: 'function', foreground: '82aaff' },
  ],
  colors: {
    'editor.background': '#011627',
    'editor.foreground': '#d6deeb',
    'editorCursor.foreground': '#80a4c2',
    'editor.selectionBackground': '#1d3b53',
    'editor.lineHighlightBackground': '#010e1a',
  },
}

export const tokyoNightTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '565f89', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'bb9af7' },
    { token: 'string', foreground: '9ece6a' },
    { token: 'number', foreground: 'ff9e64' },
    { token: 'type', foreground: '2ac3de' },
    { token: 'class', foreground: '0db9d7' },
    { token: 'function', foreground: '7aa2f7' },
  ],
  colors: {
    'editor.background': '#1a1b26',
    'editor.foreground': '#c0caf5',
    'editorCursor.foreground': '#c0caf5',
    'editor.selectionBackground': '#33467c',
    'editor.lineHighlightBackground': '#1e202e',
  },
}

export const synthwave84Theme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '848bbd' },
    { token: 'keyword', foreground: 'ff7edb' },
    { token: 'string', foreground: 'fede5d' },
    { token: 'number', foreground: 'f97e72' },
    { token: 'type', foreground: '36f9f6' },
    { token: 'class', foreground: '72f1b8' },
    { token: 'function', foreground: 'fede5d' },
  ],
  colors: {
    'editor.background': '#262335',
    'editor.foreground': '#ffffff',
    'editorCursor.foreground': '#f92aad',
    'editor.selectionBackground': '#463465',
    'editor.lineHighlightBackground': '#2a2139',
  },
}

export const cobalt2Theme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '0088ff', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'ff9d00' },
    { token: 'string', foreground: '3ad900' },
    { token: 'number', foreground: 'ff628c' },
    { token: 'type', foreground: '80ffbb' },
    { token: 'class', foreground: 'ffee80' },
    { token: 'function', foreground: 'ffc600' },
  ],
  colors: {
    'editor.background': '#193549',
    'editor.foreground': '#ffffff',
    'editorCursor.foreground': '#ffcc00',
    'editor.selectionBackground': '#0d3a58',
    'editor.lineHighlightBackground': '#1f4662',
  },
}

export const materialTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '546e7a', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'c792ea' },
    { token: 'string', foreground: 'c3e88d' },
    { token: 'number', foreground: 'f78c6c' },
    { token: 'type', foreground: 'ffcb6b' },
    { token: 'class', foreground: 'ffcb6b' },
    { token: 'function', foreground: '82aaff' },
  ],
  colors: {
    'editor.background': '#263238',
    'editor.foreground': '#eeffff',
    'editorCursor.foreground': '#ffcc00',
    'editor.selectionBackground': '#546e7a',
    'editor.lineHighlightBackground': '#212121',
  },
}

export const gruvboxDarkTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '928374', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'fb4934' },
    { token: 'string', foreground: 'b8bb26' },
    { token: 'number', foreground: 'd3869b' },
    { token: 'type', foreground: 'fabd2f' },
    { token: 'class', foreground: 'fabd2f' },
    { token: 'function', foreground: '8ec07c' },
  ],
  colors: {
    'editor.background': '#282828',
    'editor.foreground': '#ebdbb2',
    'editorCursor.foreground': '#ebdbb2',
    'editor.selectionBackground': '#504945',
    'editor.lineHighlightBackground': '#3c3836',
  },
}

// Light Themes

export const githubLightTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6e7781' },
    { token: 'keyword', foreground: 'cf222e' },
    { token: 'string', foreground: '0a3069' },
    { token: 'number', foreground: '0550ae' },
    { token: 'type', foreground: '8250df' },
    { token: 'class', foreground: '8250df' },
    { token: 'function', foreground: '8250df' },
  ],
  colors: {
    'editor.background': '#ffffff',
    'editor.foreground': '#24292f',
    'editorCursor.foreground': '#24292f',
    'editor.selectionBackground': '#0969da22',
    'editor.lineHighlightBackground': '#f6f8fa',
  },
}

export const lightPlusTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '008000' },
    { token: 'keyword', foreground: '0000ff' },
    { token: 'string', foreground: 'a31515' },
    { token: 'number', foreground: '098658' },
    { token: 'type', foreground: '267f99' },
    { token: 'class', foreground: '267f99' },
    { token: 'function', foreground: '795e26' },
  ],
  colors: {
    'editor.background': '#ffffff',
    'editor.foreground': '#000000',
    'editorCursor.foreground': '#000000',
    'editor.selectionBackground': '#add6ff',
    'editor.lineHighlightBackground': '#f0f0f0',
  },
}

export const solarizedLightTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '93a1a1', fontStyle: 'italic' },
    { token: 'keyword', foreground: '859900' },
    { token: 'string', foreground: '2aa198' },
    { token: 'number', foreground: 'd33682' },
    { token: 'type', foreground: 'b58900' },
    { token: 'class', foreground: 'b58900' },
    { token: 'function', foreground: '268bd2' },
  ],
  colors: {
    'editor.background': '#fdf6e3',
    'editor.foreground': '#657b83',
    'editorCursor.foreground': '#657b83',
    'editor.selectionBackground': '#eee8d5',
    'editor.lineHighlightBackground': '#eee8d5',
  },
}

export const quietLightTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '7f8c8d' },
    { token: 'keyword', foreground: 'aa0982' },
    { token: 'string', foreground: '448c27' },
    { token: 'number', foreground: 'f5871f' },
    { token: 'type', foreground: '7a3e9d' },
    { token: 'class', foreground: '7a3e9d' },
    { token: 'function', foreground: '4271ae' },
  ],
  colors: {
    'editor.background': '#f5f5f5',
    'editor.foreground': '#333333',
    'editorCursor.foreground': '#54494b',
    'editor.selectionBackground': '#c9d0d9',
    'editor.lineHighlightBackground': '#e5ebf1',
  },
}

export const atomOneLightTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: 'a0a1a7', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'a626a4' },
    { token: 'string', foreground: '50a14f' },
    { token: 'number', foreground: '986801' },
    { token: 'type', foreground: 'c18401' },
    { token: 'class', foreground: 'c18401' },
    { token: 'function', foreground: '4078f2' },
  ],
  colors: {
    'editor.background': '#fafafa',
    'editor.foreground': '#383a42',
    'editorCursor.foreground': '#526fff',
    'editor.selectionBackground': '#e5e5e6',
    'editor.lineHighlightBackground': '#f0f0f1',
  },
}

export const winterIsComingLightTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '66747b' },
    { token: 'keyword', foreground: '0451a5' },
    { token: 'string', foreground: '098658' },
    { token: 'number', foreground: '09885a' },
    { token: 'type', foreground: '267f99' },
    { token: 'class', foreground: '267f99' },
    { token: 'function', foreground: '795e26' },
  ],
  colors: {
    'editor.background': '#ffffff',
    'editor.foreground': '#4d4d4c',
    'editorCursor.foreground': '#0451a5',
    'editor.selectionBackground': '#c6dbef',
    'editor.lineHighlightBackground': '#f7f7f7',
  },
}

export const gruvboxLightTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '928374', fontStyle: 'italic' },
    { token: 'keyword', foreground: '9d0006' },
    { token: 'string', foreground: '79740e' },
    { token: 'number', foreground: '8f3f71' },
    { token: 'type', foreground: 'b57614' },
    { token: 'class', foreground: 'b57614' },
    { token: 'function', foreground: '427b58' },
  ],
  colors: {
    'editor.background': '#fbf1c7',
    'editor.foreground': '#3c3836',
    'editorCursor.foreground': '#3c3836',
    'editor.selectionBackground': '#d5c4a1',
    'editor.lineHighlightBackground': '#ebdbb2',
  },
}

export const lightOwlTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '989fb1', fontStyle: 'italic' },
    { token: 'keyword', foreground: '994cc3' },
    { token: 'string', foreground: 'c96765' },
    { token: 'number', foreground: 'aa0982' },
    { token: 'type', foreground: 'c96765' },
    { token: 'class', foreground: 'c96765' },
    { token: 'function', foreground: '4876d6' },
  ],
  colors: {
    'editor.background': '#fbfbfb',
    'editor.foreground': '#403f53',
    'editorCursor.foreground': '#403f53',
    'editor.selectionBackground': '#e0e0e0',
    'editor.lineHighlightBackground': '#f0f0f0',
  },
}

export const tokyoNightLightTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '9699a3', fontStyle: 'italic' },
    { token: 'keyword', foreground: '8c4351' },
    { token: 'string', foreground: '485e30' },
    { token: 'number', foreground: '965027' },
    { token: 'type', foreground: '166775' },
    { token: 'class', foreground: '166775' },
    { token: 'function', foreground: '34548a' },
  ],
  colors: {
    'editor.background': '#d5d6db',
    'editor.foreground': '#343b58',
    'editorCursor.foreground': '#343b58',
    'editor.selectionBackground': '#99a7df',
    'editor.lineHighlightBackground': '#c4c8da',
  },
}

export const ayuLightTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '787b80', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'fa8d3e' },
    { token: 'string', foreground: '86b300' },
    { token: 'number', foreground: 'a37acc' },
    { token: 'type', foreground: '399ee6' },
    { token: 'class', foreground: '399ee6' },
    { token: 'function', foreground: 'f2ae49' },
  ],
  colors: {
    'editor.background': '#fafafa',
    'editor.foreground': '#5c6166',
    'editorCursor.foreground': '#ff6a00',
    'editor.selectionBackground': '#d1e4f4',
    'editor.lineHighlightBackground': '#f3f4f5',
  },
}
