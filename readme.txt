thick0.0.6 -> lodash@~1.0.1
naf@0.0.1 -> lodash@~2.4.1
stylus-unit@0.0.4 -> lodash@^3.10.1
react-dom-utils@2.0.0 -> lodash@^4.6.1




find . -regex '.*/lodash/package*.json'

find . -regex '.*/lodash/package*.json' | xargs cat | grep version


npm install --timing=true --loglevel=verbose
