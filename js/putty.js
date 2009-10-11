function putty_program_path(fso, name, script_base) {
    var putty_dirs = ['c:\\program files\\iputty', script_base];
    var i;
    for (i=0;i<putty_dirs.length;++i) {
	var p = putty_dirs[i]+'\\'+name;
	    if (fso.FileExists(p)) {
		return p;
	    }
    }
    return '';
}
