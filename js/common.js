function GetCmdLineArgs() {
	var args = [];
	var cmdline = app.commandLine
	var s = cmdline
	var i

	var r = new RegExp('^"([^"]+)" *');
	var r2 = new RegExp('^([^ ]+) *');
	
	while (s.length > 0) {
		var m = r.exec(s)
		if (m) {
			args.push(m[1])
			s = s.substr(m.index+m[0].length)
		} else {
			m = r2.exec(s)
			if (m) {
				args.push(m[1])
				s = s.substr(m.index+m[0].length)
			} else {
				window.alert(s)
			}
		}
	}
	return args
}
