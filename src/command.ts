import { editForm, newForm } from './designer/commands';
import { compileForm } from './uic/commands';

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
];
