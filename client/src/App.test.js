import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders App component', async () => {
  render(<App />);

  // Проверяем, что спиннер отображается в начале загрузки
  const spinnerElement = screen.getByRole('status');
  expect(spinnerElement).toBeInTheDocument();

  // Ждем, пока загрузка завершится
  await waitFor(() => {
    const spinnerElement = screen.queryByRole('status');
    expect(spinnerElement).not.toBeInTheDocument();
  });

  // Проверяем, что компонент отображается после загрузки
  const appElement = screen.getByTestId('app-component');
  expect(appElement).toBeInTheDocument();
});