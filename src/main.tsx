import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Editor from './editor.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Editor />
      </CssBaseline>
    </ThemeProvider>
  </StrictMode>
)
