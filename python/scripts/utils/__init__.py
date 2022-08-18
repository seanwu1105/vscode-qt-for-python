import importlib.util
import sys


def is_installed(name: str) -> bool:
    return name in sys.modules or importlib.util.find_spec(name) is not None
