import { inject } from 'vitest';
import { applyE2eTestEnvironment } from '../support/e2e/test-environment';

applyE2eTestEnvironment(inject('e2eDatabase'));
