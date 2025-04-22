import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import SlotBookingPage from '../src/components/SlotBookingPage';

// Mock axios and partial mock for react-router-dom
vi.mock('axios');
const mockNavigate = vi.fn(); // Initialize mockNavigate at the top
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate, // Ensure mockNavigate is used here
  };
});

describe('SlotBookingPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock window.alert
    global.alert = vi.fn();
  });

  it('renders correctly', () => {
    render(
      <Router>
        <SlotBookingPage />
      </Router>
    );

    // Verify the heading and form elements are rendered
    expect(screen.getByRole('heading', { name: 'Book your Bowling Slot' })).toBeInTheDocument();
    expect(screen.getByLabelText('Select Date:')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Time:')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Lanes:')).toBeInTheDocument();
    expect(screen.getByLabelText('Duration (hours):')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm Booking' })).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    const userId = 'test-user-id';
    localStorage.setItem('userId', userId); // Mock local storage
    axios.post.mockResolvedValueOnce({});

    render(
      <Router>
        <SlotBookingPage />
      </Router>
    );

    // Fill the form
    fireEvent.change(screen.getByLabelText('Select Date:'), {
      target: { value: '2025-04-22' },
    });
    fireEvent.change(screen.getByLabelText('Select Time:'), {
      target: { value: '15:00' },
    });
    fireEvent.change(screen.getByLabelText('Number of Lanes:'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByLabelText('Duration (hours):'), {
      target: { value: '2' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Confirm Booking' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/booking/book', {
        user_id: 'test-user-id',
        date: '2025-04-22',
        time: '15:00',
        lanes: '2',
        duration: '2',
      });

      // Verify alert is called
      expect(global.alert).toHaveBeenCalledWith(
        `Slot booked successfully!\nDate: 2025-04-22\nTime: 15:00\nLanes: 2\nDuration: 2 hour(s)`
      );

      // Verify navigation
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles submission failure', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: 'Error booking slot' },
    });

    render(
      <Router>
        <SlotBookingPage />
      </Router>
    );

    // Fill the form
    fireEvent.change(screen.getByLabelText('Select Date:'), {
      target: { value: '2025-04-22' },
    });
    fireEvent.change(screen.getByLabelText('Select Time:'), {
      target: { value: '15:00' },
    });
    fireEvent.change(screen.getByLabelText('Number of Lanes:'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByLabelText('Duration (hours):'), {
      target: { value: '2' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Confirm Booking' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/booking/book', {
        user_id: localStorage.getItem('userId'),
        date: '2025-04-22',
        time: '15:00',
        lanes: '2',
        duration: '2',
      });

      // Verify alert is called for failure
      expect(global.alert).toHaveBeenCalledWith('Booking failed. Please try again.');
    });
  });
});
