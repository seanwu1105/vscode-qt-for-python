import importlib.util
import re
import sys
from typing import Any, Callable


def is_installed(name: str) -> bool:
    return name in sys.modules or importlib.util.find_spec(name) is not None


def remove_vendor_suffix(string: str) -> str:
    return re.sub(r'(-script\.pyw|\.exe)?$', '', string)


class QtToolModuleNotFoundError(Exception):
    def __init__(self, tool_name: str) -> None:
        super().__init__()
        self.tool_name = tool_name


def catch_known_errors(func: Callable[[], Any]):
    try:
        func()
    except QtToolModuleNotFoundError as exception:
        sys.stderr.write(
            f'{exception.__class__.__name__} {exception.tool_name}'
        )
