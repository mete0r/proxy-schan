var plink_path = '"c:\\program files\\iputty\\plink.exe"'

var fso = WScript.CreateObject('Scripting.FileSystemObject');
var shell = WScript.CreateObject('WScript.Shell');
var script_path = fso.GetParentFolderName(WScript.ScriptFullName);

var conf_path = script_path

function read_conf(filename) {
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

var conf_filename = conf_path+'\\conf.txt';
var conf = read_conf(conf_filename);
if (conf['SSH_HOST']) {
	var cmd = plink_path+' -v -N -D '+conf['LOCAL_PORT']+' -agent -l '+conf['SSH_USER']+' -P '+conf['SSH_PORT']+' '+conf['SSH_HOST']
	shell.run(cmd, 7)
}
