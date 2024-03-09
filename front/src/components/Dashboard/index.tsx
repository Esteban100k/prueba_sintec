import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tareas from './components/Tareas';

const theme = createTheme();

export default function Dashboard() {

  return (
    <ThemeProvider theme={theme}>
      <Tareas />
    </ThemeProvider>
  );
}