import subprocess

from tests import SCRIPTS_DIR


def test_qmlls_help():
    result = invoke_qmlls_py(["--help"])
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


def invoke_qmlls_py(args: list[str]):
    return subprocess.run(
        ["poetry", "run", "python", "qmlls.py", *args],
        cwd=SCRIPTS_DIR,
        capture_output=True,
    )
