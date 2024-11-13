import {
  createBackendPlugin,
  coreServices,
} from '@backstage/backend-plugin-api';
import { catalogServiceRef } from '@backstage/plugin-catalog-node/alpha';
import { createRouter } from './service/router';

export const artifactoryPlugin = createBackendPlugin({
  pluginId: 'artifactory',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        config: coreServices.rootConfig,
        catalogApi: catalogServiceRef,
        httpRouter: coreServices.httpRouter,
      },
      async init({ logger, config, catalogApi, httpRouter }) {
        httpRouter.use(
          await createRouter({
            logger,
            config,
            catalogApi,
          }),
        );
      },
    });
  },
});
