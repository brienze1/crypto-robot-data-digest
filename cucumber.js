let common = [
    'src/test/integrated/features/**/*.feature',                // Specify our feature files
    '--require-module ts-node/register',    // Load TypeScript module
    '--require src/test/integrated/step-definitions/**/*.ts',   // Load step definitions
    '--require-module tsconfig-paths/register', // Make path aliases work
    '--require-module dotenv/config dotenv_config_path=resources/.env.integration-test', // Test env
    '--format progress-bar',                // Load custom formatter
    '--format @cucumber/pretty-formatter', // Load custom formatter
    '--publish-quiet'
].join(' ');

module.exports = {
    default: common
};
