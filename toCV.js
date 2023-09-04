//
// Modify an AAVSO report file to change the filter from 'V' to 'CV'
//

'use strict';

const fs = require('fs');
const allFiles = fs.readdirSync('.');

allFiles.forEach((file) => {

	if (file.substring(0, 11) == 'AAVSOReport') {

		let newFileName = 'New-' + file;
		let fileHandle = fs.openSync(newFileName, 'w');

		console.log(`Processing file: ${file}`);

		const allContents = fs.readFileSync(file, 'utf-8');

		allContents.split(/\r?\n/).forEach((line) => {
			// console.log('line: ', line);

			if (line[0] == '#') {
				console.log(line);
				fs.writeSync(fileHandle, line+'\n');
				return;
			}

			let split = line.split(',');
			let newLine = '';

			if (split.length < 5) {
				console.log(line);
				fs.writeSync(fileHandle, line+'\n');
				return;
			}

			for (let x=0; x<split.length; x++) {

				if ((x == 4) && (split[x] == 'V')) {
					newLine += 'CV';
				} else {
					newLine += split[x];
				}

				if (x < split.length-1)
					newLine += ',';
			}

			// console.log(newLine);
			fs.writeSync(fileHandle, newLine+'\n');
		});

		fs.closeSync(fileHandle);
	}
});