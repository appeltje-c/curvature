import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Editor from './editor.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme/index.ts'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Editor />
        </CssBaseline>
      </ThemeProvider>
    </SnackbarProvider>
  </StrictMode>
)
