import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

// Configuração do ambiente de teste
setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});
