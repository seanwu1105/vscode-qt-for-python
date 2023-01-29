import os
import subprocess

from tests import ASSETS_DIR, SCRIPTS_DIR


def test_rcc_version():
    result = invoke_rcc_py(["-v"])
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


def test_rcc_sample_qrc():
    filename = "sample.qrc"
    result = invoke_rcc_py([get_assets_path(filename)])
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


def invoke_rcc_py(args: list[str]):
    return subprocess.run(
        ["poetry", "run", "python", "rcc.py", *args],
        cwd=SCRIPTS_DIR,
        capture_output=True,
        check=True,
    )


def get_assets_path(filename: str) -> str:
    return os.path.join(ASSETS_DIR, "qrc", filename)
