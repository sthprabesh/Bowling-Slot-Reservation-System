import React from 'react';
import '../styles/CancellationPolicy.css';

const CancellationPolicy = () => {
    return (
        <div className="cancellation-policy">
            <h2>Cancellation Policy</h2>
            <p><strong>Standard Cancellations:</strong> You can cancel your reservation anytime before 24 hours of the booked time.</p>
            <p><strong>Late Cancellations:</strong> If you cancel within 24 hours of your reservation, an invoice will be sent for the reserved time.</p>
            <p><strong>Refunds:</strong> Refunds are only applicable for cancellations made more than 24 hours in advance.</p>
            <p><strong>No-shows:</strong> If you fail to show up for your booking without canceling, charges will still apply.</p>
        </div>
    );
};

export default CancellationPolicy;
