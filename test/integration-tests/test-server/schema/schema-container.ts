import glob = require('glob');
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import path = require('path');
import 'reflect-metadata';
import { CommonEntityInterface, InjectableType, POLARIS_TYPES } from '../../../../src/main';

export let requireAllInFolder = (pathToDir: string): void => {
    const files = glob.sync(pathToDir);
    files.forEach(file => {
        if ((file.endsWith('.ts') && !file.endsWith('.d.ts')) || file.endsWith('.js')) {
            file = file.replace(/\.[^/.]+$/, '');
            require(file);
        }
    });
};

// Require all types and resolvers so they can be injected later
requireAllInFolder(path.join(__dirname, './entities/**/*'));
requireAllInFolder(path.join(__dirname, './resolvers/*'));

// Create container
export const schemaContainer = new Container();
schemaContainer.load(buildProviderModule());
schemaContainer
    .bind<CommonEntityInterface>(POLARIS_TYPES.CommonEntityInterface)
    .to(CommonEntityInterface);
schemaContainer.bind<InjectableType>(POLARIS_TYPES.InjectableType).to(CommonEntityInterface);
