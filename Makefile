gendiff:
		node bin/gendiff.js

install:
		npm ci

lint:
		npx eslint .

test:
		npx jest

publish:
		npm publish --dry-run && sudo npm link

test-coverage:
		npm test -- --coverage --coverageProvider=v8
