export default {
    '*.md': ['pnpm remark:fix', 'pnpm format:fix'],
    '*.{cjs,js,ts,tsx,json,yaml}': 'pnpm format:fix',
    '*.{cjs,js,ts,tsx}': 'pnpm lint:fix'
};
