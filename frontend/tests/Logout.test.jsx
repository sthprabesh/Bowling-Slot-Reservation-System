import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import Logout from '../src/components/Logout';

// Mock `useNavigate` and `fetch`
const mockNavigate = vi.fn();
global.fetch = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Logout', () => {
  const mockOnLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.alert = vi.fn(); // Mock `alert` to avoid errors during testing
  });

  it('handles logout failure gracefully', async () => {
    // Mock fetch failure
    fetch.mockResolvedValueOnce({ ok: false });
    
    // Set localStorage item manually
    localStorage.setItem('userId', 'test-user-id');

    render(
      <Router>
        <Logout onLogout={mockOnLogout} />
      </Router>
    );

    // Click the Log Out button to show confirmation popup
    fireEvent.click(screen.getByRole('button', { name: 'Log Out' }));
    
    // Click the Confirm button
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    await waitFor(() => {
      // Verify fetch was called
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/auth/logout', { method: 'POST' });
      
      // Assert `localStorage` is not cleared
      const userId = localStorage.getItem('userId');
      expect(userId).toBe('test-user-id');

      // Verify the onLogout callback is NOT called
      expect(mockOnLogout).not.toHaveBeenCalled();

      // Verify navigation does NOT occur
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
