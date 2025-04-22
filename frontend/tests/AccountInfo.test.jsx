import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import AccountInfo from '../src/components/AccountInfo';

// Mock axios and react-router-dom
vi.mock('axios');
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AccountInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.alert = vi.fn(); // Mock window.alert
  });

  it('displays loading state initially', () => {
    render(
      <Router>
        <AccountInfo />
      </Router>
    );

    // Verify loading message
    expect(screen.getByText('Loading user information...')).toBeInTheDocument();
  });

  it('redirects to login page if userId is missing', async () => {
    localStorage.removeItem('userId'); // Simulate missing userId

    render(
      <Router>
        <AccountInfo />
      </Router>
    );

    // Wait for side effects
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        'Session expired or user not logged in. Redirecting to login page.'
      );
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('fetches and displays user information', async () => {
    const mockUserData = {
      fullname: 'John Doe',
      email: 'john.doe@example.com',
      phone_number: '1234567890',
      membership: 'Premium',
    };

    localStorage.setItem('userId', 'test-user-id');
    axios.get.mockResolvedValueOnce({ data: mockUserData });

    render(
      <Router>
        <AccountInfo />
      </Router>
    );

    // Wait for user data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Account Information')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('1234567890')).toBeInTheDocument();
      expect(screen.getByText('Premium')).toBeInTheDocument();
    });
  });

  it('handles API failure gracefully', async () => {
    localStorage.setItem('userId', 'test-user-id');
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <Router>
        <AccountInfo />
      </Router>
    );

    // Wait for side effects
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        'Failed to fetch user information. Please try again.'
      );
      expect(screen.getByText('No user information found.')).toBeInTheDocument();
    });
  });
});
