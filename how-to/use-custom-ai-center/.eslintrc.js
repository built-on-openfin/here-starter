module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:promise/recommended', 'prettier'],
	plugins: ['simple-import-sort', 'unused-imports'],
	ignorePatterns: ['node_modules/', 'public/js/*.js'],
	rules: {
		'import/no-unresolved': 'off',
		'no-console': 'off',
		'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'simple-import-sort/imports': 'error',
		'unused-imports/no-unused-imports': 'error'
	},
	overrides: [
		{
			files: ['*.ts'],
			parser: '@typescript-eslint/parser',
			extends: ['plugin:@typescript-eslint/recommended'],
			plugins: ['@typescript-eslint'],
			rules: {
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
				'@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
				'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }]
			}
		}
	]
};
