async function submitForm(event) {
  event.preventDefault();

  const apiUrl = 'https://sheetdb.io/api/v1/amxeepufjfzvc';

  const form = document.getElementById('form');
  const formData = new FormData(form);
  const medication = [];

  formData.getAll('medication[]').forEach((value) => {
    medication.push(value);
  });

  const data = {
    "data": [
      {
        "patients_name": formData.get('patients_name'),
        "cid": formData.get('cid'),
        "injury_code": formData.get('injury_code'),
        "medication": medication.join(', '),
        "notes": formData.get('notes')
      }
    ]
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Form submitted successfully');
      form.reset();
    } else {
      alert('Error submitting form');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error submitting form');
  }
}
