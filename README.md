# after effect setup

[entire blog link](https://www.codeandmotion.com/blog/visual-studio-code-adobe-extendscript)
step by step process
## Workspace Setup

## Type Definition Support

[aeenhancers after effects scrpiting type support // github](https://github.com/aenhancers/Types-for-Adobe)
i'm keeping the files sorta separate, later I might just include the entire repository for development.

`config.json` -> error reporting perhaps?

I just imported 2 scripts that I knew
`EZInertia` and `FX Console` and type checking seems to be working.

also comment off this line
[checkJS in jsconfig.json](jsconfig.json#L6) comment it off if you want no errors.

## Adobe Script Runner Extension
upon running the script I can see it sends it straight to the version that is currently defaulted


## resources
[js docs  ES3](https://devdocs.io/jsdoc/)
[file icons extra grepper] vscode marketplace
[ExtendScript Debugger] Adobe Team

## Debugger Setup
go to the debugger and try it out
launch the instance vs Attach?
and there's the whole debugging panel and its all ez clap.


ran into an interesting observation
(unix/Linux) LF -> Line Feed
(Windows) CR + LF-> Carriage Return

this causes problems when coding
[fixes](https://stackoverflow.com/questions/5834014/lf-will-be-replaced-by-crlf-in-git-what-is-that-and-is-it-important)
`git config --global core.autocrlf true`