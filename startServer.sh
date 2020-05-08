# change value of max_old_space_size if you see heap allocation issue when running ng serve
node --max_old_space_size=4896 node_modules/@angular/cli/bin/ng serve --prod --aot --host 0.0.0.0