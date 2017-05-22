//new CodeView("#test").write('var a = true; document === false;').write('//33 var').write("a = 'w'");
new CodeView({
    selector:"#test",
    // noWrap: false,
    //url: '/code-view-test-data.js'
})
.writeFileContent('https://github.com/ilian6806/CodeView/blob/master/code-view-test-data.js')
.write(['var a = true;','//33 var', "a = 'w'"]).write('a=123')
.write("a = 'w'");
