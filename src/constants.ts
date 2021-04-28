import { name, publisher } from '../package.json';

export const EXTENSION_NAME = 'qtForPython';

export const EXTENSION_ID = `${publisher}.${name}`;

export type SupportedTool = 'designer' | 'lupdate' | 'uic' | 'rcc';
