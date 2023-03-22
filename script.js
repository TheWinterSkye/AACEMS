const API_KEY = 'AIzaSyAUoGZe5leyZmnH5vAsmInhD1HmDm_uxI4';

const form = document.getElementById('form');
const submitBtn = document.getElementById('submit_btn');

// Function to send data to Google Sheet
async function sendDataToGoogleSheet(data) {
  const spreadsheetId = '1MeEk6IUBWZwP8fNwcOKkF6ZhIyKscV_l6gVd8Derih0';
  const sheetName = 'EMS TRANSPORT CHARTS';
  const range = 'EMSTRANSPORTCHARTS!A:F';

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range,
      majorDimension: 'ROWS',
      values: [data],
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
    }),
  });
}

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  // Get form data
  const patients_name = form.patients_name.value;
  const cid = form.cid.value;
  const injury_code = form.injury_code.value;
  const medications = Array.from(form['medication[]']).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  const notes = form.notes.value;

  const chartNumber = new Date().toISOString().replace(/[-:.]/g, '');

  // Prepare data for Google Sheet
  const data = [chartNumber, patients_name, cid, injury_code, medications.join(', '), notes];

  // Send data to Google Sheet
  sendDataToGoogleSheet(data).then(() => {
    alert('Data submitted successfully!');
    form.reset();
  }).catch((error) => {
    console.error('Error sending data to Google Sheet:', error);
    alert('Failed to submit data. Please try again.');
  });
});
