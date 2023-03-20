// Replace with your own client ID and client secret
const CLIENT_ID = '466955074065-bbu0i5sb3aqrnjm6e6k3jd2lq39hpahs.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const REDIRECT_URI = 'https://spectacular-daifuku-b382f4.netlify.app';

const form = document.getElementById('form');
const submitBtn = document.getElementById('submit_btn');

// Google API OAuth2 setup
gapi.load('client:auth2', () => {
  gapi.client.init({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    scope: SCOPE,
    redirectUri: REDIRECT_URI,
  }).then(() => {
    // Check if user is already signed in
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      submitBtn.disabled = false;
    } else {
      // If not signed in, prompt user to sign in
      gapi.auth2.getAuthInstance().signIn().then(() => {
        submitBtn.disabled = false;
      });
    }
  });
});

// Function to send data to Google Sheet
async function sendDataToGoogleSheet(data) {
  const spreadsheetId = '1MeEk6IUBWZwP8fNwcOKkF6ZhIyKscV_l6gVd8Derih0';
  const sheetName = 'Sheet1';
  const range = `${sheetName}!A:F`;

  await gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [data]
    },
  });
}

// Event listener for form submission
form.addEventListener('submit', (e) => {
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
