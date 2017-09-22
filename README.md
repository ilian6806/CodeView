# CodeView
Code visualizer for web with simple [themes](https://ilian6806.github.io/CodeView/#themes) system.


[![Code Climate](https://codeclimate.com/github/ilian6806/CodeView/badges/gpa.svg)](https://codeclimate.com/github/ilian6806/CodeView) [![Issue Count](https://codeclimate.com/github/ilian6806/CodeView/badges/issue_count.svg)](https://codeclimate.com/github/ilian6806/CodeView) ![](https://img.shields.io/gemnasium/mathiasbynens/he.svg) ![](https://img.shields.io/npm/l/express.svg)

#### Setup:
Just include this ```<script src="code-view.js"></script>```

or this, if you want to use it like jquery plugin ```<script src="jquery.code-view.js"></script>```

or their minified versions from ```src/``` folder in this repo. 

Then choose one of the color schemes in ```themes/``` folder. For example ```<link rel="stylesheet" href="sublime-monokai.css">```
 
That's it !
 
#### Usage:
```javascript
new CodeView({
    selector: '#result',
    content: 'var content = "optional initial content";'
})
.write('a = \'55\'')
.write([
    'var b = true;',
    '// some comment',
    'a = 100;'
])
.write('c = 123;');
```
#### Result:

![screenshot_15](https://user-images.githubusercontent.com/7155803/30377215-ab84d1c6-9897-11e7-81a3-2d5b257fbe29.png)

#### jQuery plugin:

```javascript
$('#result')
    .codeView('// Initial content')
    .write('var obj = new Object(null);')
    .write([
        'var name = \'Ilian\';',
        '// some other comment',
        'name = null;'
    ]);
```

#### Load code from file:

```javascript
new CodeView({
    selector: '#result',
    url: 'url/to/local/file'
});
```

It can be use for something like [this](https://ilian6806.github.io/Handy/) for example.
You can find some more docs [here](https://ilian6806.github.io/CodeView/).
