const path = require('path');

module.exports = exports = function runProphet(dates, nums, period) {
  // Spawn a child-process executing Python
  const { spawn } = require('child_process');
  const py = spawn('python',  [path.join(__dirname, 'prophet.py')]);

  // Use streams interface to send data to Pytohn process
  let dataString = '';
  let errorString = '';
  py.stdout.on('data', data => dataString += data);
  // py.stdout.on('end', () => console.log(errorString ? errorString : JSON.parse(dataString.match(/{.+}/)[0])));
  py.stdout.on('end', () => console.log(errorString ? errorString : dataString));
  py.stderr.on('error', data => errorString += data);
  py.stdin.write(JSON.stringify([dates, nums, period]));
  py.stdin.end();
};
