function AppointmentList({ appointments }) {
  const handleCancel = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/${id}/cancel`, {
        method: "PATCH"
      });
      if (!response.ok) throw new Error("Failed to cancel");
      alert("Appointment cancelled!");
    } catch (err) {
      console.error(err);
      alert("Error cancelling appointment");
    }
  };

  return (
    <div>
      {appointments.map(appt => (
        <div key={appt.id}>
          <p>{appt.details}</p>
          <button onClick={() => handleCancel(appt.id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}