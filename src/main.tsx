import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Editor from './editor.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme/index.ts'
import { SnackbarProvider } from 'notistack'
import { KeyboardControls } from '@react-three/drei'
import { KeyMap } from './types/keys.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <KeyboardControls map={KeyMap}>
            <Editor />
          </KeyboardControls>
        </CssBaseline>
      </ThemeProvider>
    </SnackbarProvider>
  </StrictMode>
)
