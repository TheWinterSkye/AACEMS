document.addEventListener('DOMContentLoaded', () => {
  const form = document.createElement('form');
  form.innerHTML = `<button type="submit">Submit</button>`;
  document.querySelector('.content').appendChild(form);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = document.getElementById('first_name').value || 'Jane/Jon';
    const lastName = document.getElementById('last_name').value || 'Doe';
    const cid = document.getElementById('cid').value || `${lastName}${getChartNumber()}`;

    const injuryCode = document.querySelector('input[name="injury_code"]:checked')?.value || '';

    const medicationElems = document.querySelectorAll('input[name="medication[]"]:checked');
    const medications = Array.from(medicationElems).map(elem => elem.value).join(', ');

    const csvContent = `"${firstName}","${lastName}","${cid}",${getChartNumber()},"${injuryCode}","${medications}"\r\n`;
    downloadCSV(csvContent, 'transport.csv');
  });
});

function getChartNumber() {
  const chartNumber = localStorage.getItem('chartNumber') || 0;
  localStorage.setItem('chartNumber', Number(chartNumber) + 1);
  return Number(chartNumber) + 1;
}

function downloadCSV(csvContent, fileName) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}