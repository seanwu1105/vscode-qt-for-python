import os
import subprocess

from tests import ASSETS_DIR, SCRIPTS_DIR


def test_uic_version():
    result = invoke_uic_py(["--version"])
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


def test_uic_sample_ui():
    filename = "sample.ui"
    result = invoke_uic_py([get_assets_path(filename)])
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


def invoke_uic_py(args: list[str]):
    return subprocess.run(
        ["poetry", "run", "python", "uic.py", *args],
        cwd=SCRIPTS_DIR,
        capture_output=True,
    )


def get_assets_path(filename: str) -> str:
    return os.path.join(ASSETS_DIR, "ui", filename)
