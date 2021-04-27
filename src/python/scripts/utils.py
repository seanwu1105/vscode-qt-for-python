import sys
import importlib.util
import re


def is_installed(name):
    return name in sys.modules or importlib.util.find_spec(name) is not None


def remove_vendor_suffix(string):
    return re.sub(r'(-script\.pyw|\.exe)?$', '', string)
