import os
import subprocess

from tests import ASSETS_DIR, SCRIPTS_DIR


def test_lupdate_help():
    result = invoke_lupdate_py(["-help"])
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


def test_lupdate_sample_py():
    filename = "sample.py"
    result = invoke_lupdate_py(
        [get_assets_path(filename), "-ts", get_assets_path("sample.ts")]
    )
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0
    assert os.path.exists(get_assets_path("sample.ts"))

    os.remove(get_assets_path("sample.ts"))


def invoke_lupdate_py(args: list[str]):
    return subprocess.run(
        ["poetry", "run", "python", "lupdate.py", *args],
        cwd=SCRIPTS_DIR,
        capture_output=True,
        check=True,
    )


def get_assets_path(filename: str) -> str:
    return os.path.join(ASSETS_DIR, "linguist", filename)
