import os
import subprocess

import pytest

from tests import ASSETS_DIR, SCRIPTS_DIR


@pytest.mark.skip(reason="a GUI app cannot be closed gracefully")
def test_designer_sample_ui():
    filename = "sample.ui"
    result = invoke_designer_py([get_assets_path(filename)])
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


def invoke_designer_py(args: list[str]):
    return subprocess.run(
        ["poetry", "run", "python", "designer.py", *args],
        cwd=SCRIPTS_DIR,
        capture_output=True,
        check=True,
    )


def get_assets_path(filename: str) -> str:
    return os.path.join(ASSETS_DIR, "ui", filename)
