const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const diretorio = path.resolve('./');

const arquivos = fs.readdirSync(diretorio);

function cbzator(a) {

	// loopa nos subdirs
	a.forEach(b => {
		// sluga o nome
		newB = b.replace(/\s/g, '-').replace(/[\(\)]/g, '');

		if(path.resolve(diretorio, b) != path.resolve(diretorio, newB)) {
			shell.mv(path.resolve(diretorio, b), path.resolve(diretorio, newB));
		}

		bName = newB;
		b = path.resolve(diretorio, newB);
		
		let stat = fs.statSync(b);

		// se é pasta...
		if (stat && stat.isDirectory()) {
			if (bName !== 'completed') {
				let zip = 'zip -j ' + bName + '.cbz ';
				fs.readdirSync(b).forEach(c => {

					cName = c;
					c = path.resolve(diretorio, b, c);
					if (c.includes('pdf')) {
						shell.exec('mv ' + c + ' .');
					} else if (cName.indexOf('.') !== 0) {
						// zip = zip + b + '/' + cName + ' ';
						zip = zip + bName + '/' + cName + ' ';
					}
				})
				console.log('ZIPANDO!', newB);
				shell.exec(zip);
				shell.exec(`mv ${bName} completed`);
			}
		}
	})
}

cbzator(arquivos);