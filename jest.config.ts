// import { getJestProjectsAsync } from '@nx/jest';

// export default async () => ({
//   projects: await getJestProjectsAsync(),
// });
import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: await getJestProjectsAsync(),
  preset: '<rootDir>/MonorepoSmartax/jest.preset.js',  // ודא שהנתיב נכון
});
