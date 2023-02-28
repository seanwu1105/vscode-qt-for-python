import subprocess

import pytest
from tests import SCRIPTS_DIR


@pytest.mark.skip(reason="Ubuntu on GitHub Actions does not have libGL.so.1")
def test_qml_help():
    result = invoke_qml_py(["--help"])
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


def invoke_qml_py(args: list[str]):
    return subprocess.run(
        ["poetry", "run", "python", "qml.py", *args],
        cwd=SCRIPTS_DIR,
        capture_output=True,
        check=True,
    )
