import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import LoginSignupPage from '../src/components/LoginSignupPage';

// Mock axios and partial mock for react-router-dom
vi.mock('axios');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('LoginSignupPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login mode initially', () => {
    render(
      <Router>
        <LoginSignupPage />
      </Router>
    );

    // Target the heading specifically
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(
      screen.getByText("Don't have an account? Sign up here.")
    ).toBeInTheDocument();
  });

  it('toggles to sign-up mode when link is clicked', () => {
    render(
      <Router>
        <LoginSignupPage />
      </Router>
    );

    // Simulate click to switch to sign-up mode
    fireEvent.click(screen.getByText("Don't have an account? Sign up here."));
    
    // Target the heading specifically
    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    expect(
      screen.getByText('Already have an account? Log in here.')
    ).toBeInTheDocument();
  });

  it('handles login successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { userId: '123' } });

    render(
      <Router>
        <LoginSignupPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Email or Phone Number:'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/auth/login', {
        emailOrPhone: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('handles sign-up successfully', async () => {
    axios.post.mockResolvedValueOnce({});

    render(
      <Router>
        <LoginSignupPage />
      </Router>
    );

    fireEvent.click(screen.getByText("Don't have an account? Sign up here."));

    fireEvent.change(screen.getByLabelText('Full Name:'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Phone Number:'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'securepassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/auth/signup', {
        fullname: 'John Doe',
        phone_number: '1234567890',
        email: 'john.doe@example.com',
        password: 'securepassword',
      });
    });
  });
});
