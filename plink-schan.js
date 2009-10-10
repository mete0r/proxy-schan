var plink_path = '"c:\\program files\\iputty\\plink.exe"'

var fso = WScript.CreateObject('Scripting.FileSystemObject');
var shell = WScript.CreateObject('WScript.Shell');
var script_path = fso.GetParentFolderName(WScript.ScriptFullName);

var conf_path = script_path

var conf = new ActiveXObject('Scripting.Dictionary')
var conf_filename = conf_path+'\\conf.txt';
if (fso.FileExists(conf_filename)) {
	var f = fso.OpenTextFile(conf_filename, 1)
	while (!f.AtEndOfStream) {
		var line = f.ReadLine()
		var r = new RegExp(' *([^= ]+) *= *(.*)')
		var m = r.exec(line)
		if (m == null) {
			WScript.echo('no match')
		} else {
			//WScript.echo(m[1]);
			//WScript.echo(m[2]);
			conf.add(m[1], m[2])
		}
	}
	f.Close()
}
if (!conf.Exists('SSH_PORT')) {
	conf.add('SSH_PORT', '22')
}
if (!conf.Exists('LOCAL_PORT')) {
	conf.add('LOCAL_PORT', '8000')
}
if (conf.Exists('SSH_HOST')) {
	var cmd = plink_path+' -v -N -D '+conf('LOCAL_PORT')+' -agent -P '+conf('SSH_PORT')+' '+conf('SSH_HOST')
	shell.run(cmd, 7)
}
