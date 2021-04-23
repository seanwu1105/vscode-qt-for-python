import sys
import importlib.util


def is_installed(name):
    return name in sys.modules or importlib.util.find_spec(name) is not None
