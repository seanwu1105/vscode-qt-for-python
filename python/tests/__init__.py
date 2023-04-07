import os
import platform
import subprocess
import typing

from scripts.utils import QT_DEPENDENCY_ARG, SupportedQtDependencies

TESTS_DIR = os.path.dirname(os.path.realpath(__file__))

SCRIPTS_DIR = os.path.join(TESTS_DIR, os.pardir, "scripts")

ASSETS_DIR = os.path.join(TESTS_DIR, "assets")

SupportedScripts = typing.Type[str]


def filter_available_qt_dependencies(
    deps: typing.List[SupportedQtDependencies],
) -> typing.List[SupportedQtDependencies]:
    if platform.system() == "Darwin" and platform.machine() == "arm64":
        return [None] + list(filter(lambda d: d not in ("PySide2", "PyQt5"), deps))
    return [None] + deps


def invoke_script(
    name: SupportedScripts,
    args: typing.List[str],
    qt_dependency: SupportedQtDependencies,
):
    if qt_dependency is not None:
        args.append(f"--{QT_DEPENDENCY_ARG}")
        args.append(qt_dependency)

    return subprocess.run(
        ["poetry", "run", "python", f"{name}.py", *args],
        cwd=SCRIPTS_DIR,
        capture_output=True,
        check=False,
    )
