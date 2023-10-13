gendiff:
		node bin/gendiff.js

install:
		npm ci

lint:
		npx eslint .

publish:
		npm publish --dry-run && sudo npm link
