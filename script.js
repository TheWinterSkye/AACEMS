// Replace with your own client ID and client secret
const CLIENT_ID = '466955074065-bbu0i5sb3aqrnjm6e6k3jd2lq39hpahs.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const REDIRECT_URI = 'https://accounts.google.com/o/oauth2/auth';

const form = document.getElementById('form');
const submitBtn = document.getElementById('submit_btn');

let accessToken;

// Function to get access token using client ID and client secret
async function getAccessToken() {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&access_type=offline`;

  const authCode = await new Promise((resolve) => {
    const authWindow = window.open(authUrl, '_blank', 'width=800,height=600');
    window.addEventListener('message', (event) => {
      if (event.origin === window.location.origin) {
        resolve(event.data);
        authWindow.close();
      }
    });
  });

  const tokenResponse = await fetch(`https://www.googleapis.com/oauth2/v4/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code: authCode,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  });

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

// Function to send data to Google Sheet
async function sendDataToGoogleSheet(data) {
  const spreadsheetId = '1MeEk6IUBWZwP8fNwcOKkF6ZhIyKscV_l6gVd8Derih0';
  const sheetName = 'EMS TRANSPORT CHARTS';
  const range = `${sheetName}!A:F`;

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

  if (!accessToken) {
    accessToken = await getAccessToken();
  }

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
    console.error('Error sending data toGoogle Sheet:', error);
alert('Failed to submit data. Please try again.');
});
});
