module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            "jsx": true
        }
    },
    env: {
        browser: true,
    },
    rules: {
        "indent": ["error", 4],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-console": "error",
        "arrow-parens": 0
    },
    parser: "babel-eslint",
    plugins: [
        "react"
    ],
}
