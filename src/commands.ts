import { editForm, newForm } from './tools/designer';
import { compileResource } from './tools/rcc';
import { compileForm } from './tools/uic';

interface Command {
  readonly name: string;
  callback(...args: any[]): any;
}

export const commands: Command[] = [
  {
    name: 'newForm',
    callback: newForm,
  },
  {
    name: 'editForm',
    callback: editForm,
  },
  {
    name: 'compileForm',
    callback: compileForm,
  },
  {
    name: 'compileResource',
    callback: compileResource,
  },
];
