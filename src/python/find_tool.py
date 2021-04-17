import sys
import glob


def find_tool(file_name):
    for path in sys.path:
        tool_paths = glob.glob(
            f'{path}/**/PySide6/{file_name}', recursive=True
        )
        if len(tool_paths) > 0:
            return tool_paths[0]
    raise FileNotFoundError(f'Tool {file_name} cannot be found.')


if len(sys.argv) < 2:
    raise SyntaxError('Should contain the file name of the target tool.')

tool_file_name = sys.argv[1]

sys.stdout.write(find_tool(tool_file_name))
