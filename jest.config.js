module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js',
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'public', '<rootDir>/e2e/'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby|gatsby-script)/)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  globals: {
    __PATH_PREFIX__: '',
  },
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  collectCoverageFrom: ['src/pages/**/*.jsx', 'src/components/**/*.jsx'],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 85,
      functions: 98,
      lines: 98,
    },
  },
};
