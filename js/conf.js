function read_conf(fso, filename) {
	var conf = {}
	if (fso.FileExists(filename)) {
		var f = fso.OpenTextFile(filename, 1)
		while (!f.AtEndOfStream) {
			var line = f.ReadLine()
			var r = new RegExp(' *([^= ]+) *= *(.*)')
			var m = r.exec(line)
			if (m) {
				conf[m[1]] = m[2];
			}
		}
		f.Close();
	}
	return conf;
}
