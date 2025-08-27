import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		files: ['**/*.ts', '**/*.tsx'],
		extends: [
			...tseslint.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.stylisticTypeChecked
		],
		rules: {
			'@typescript-eslint/require-await': 'warn',
			'@typescript-eslint/no-misused-promises': 'warn'
		}
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: true
		},
		languageOptions: {
			parserOptions: {
				projectService: true
			}
		}
	}
);
