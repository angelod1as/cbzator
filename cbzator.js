const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const diretorio = path.resolve('./');

const arquivos = fs.readdirSync(diretorio);
let i = 0;

function cbzator(a) {

	// loopa nos subdirs
	a.forEach(b => {
		console.log(b);

		// sluga o nome
		newB = b.replace(/\s/g, '-').replace(/[\(\)]/g, '');

		console.log(newB);

		if(path.resolve(diretorio, b) != path.resolve(diretorio, newB)) {
			shell.mv(path.resolve(diretorio, b), path.resolve(diretorio, newB));
		}

		bName = newB;
		b = path.resolve(diretorio, newB);
		
		let stat = fs.statSync(b);

		// se é pasta...
		if (stat && stat.isDirectory()) {
			let zip = 'zip -j ' + bName + '.zip ';
			fs.readdirSync(b).forEach(c => {

				cName = c;
				c = path.resolve(diretorio, b, c);
				if (c.includes('pdf')) {
					console.log(cName);
					shell.exec('mv ' + c + ' .');
				} else if (cName.indexOf('.') !== 0) {
					// zip = zip + b + '/' + cName + ' ';
					zip = zip + bName + '/' + cName + ' ';
				}
			})
			console.log('ZIPANDO!');
			console.log(zip);
			shell.exec(zip);
		}
	})
}

cbzator(arquivos);



