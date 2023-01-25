import collections
import json
import os
import subprocess
import typing

import jsonschema
import pytest
from tests import ASSETS_DIR, SCRIPTS_DIR


def test_qmllint_version():
    result = invoke_qmllint_py(["-v"])
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


def test_qmllint_passed(schema):
    filename = "pass.qml"
    result = lint_qml(filename)
    assert result.returncode == 0

    parsed: QmlLintResult = parse_json(result.stdout.decode("utf-8"))
    jsonschema.validate(instance=parsed, schema=schema)

    assert len(parsed["files"]) == 1

    file = parsed["files"][0]
    assert os.path.abspath(file["filename"]) == get_assets_path(filename)
    assert file["success"] == True
    assert file["warnings"] == []


def test_qmllint_informed(schema):
    filenames = ["multiline_string.qml"]

    for filename in filenames:
        result = lint_qml(filename)
        assert result.returncode == 0

        parsed: QmlLintResult = parse_json(result.stdout.decode("utf-8"))
        jsonschema.validate(instance=parsed, schema=schema)

        assert len(parsed["files"]) == 1

        file = parsed["files"][0]
        assert os.path.abspath(file["filename"]) == get_assets_path(filename)
        assert file["success"] == True
        assert len(file["warnings"]) > 0


def test_qmllint_failed(schema):
    filenames = ["missing_import.qml", "syntax_error.qml", "unknown_import.qml"]

    for filename in filenames:
        result = lint_qml(filename)
        assert result.returncode != 0

        parsed: QmlLintResult = parse_json(result.stdout.decode("utf-8"))
        jsonschema.validate(instance=parsed, schema=schema)

        assert len(parsed["files"]) == 1

        file = parsed["files"][0]
        assert os.path.abspath(file["filename"]) == get_assets_path(filename)
        assert file["success"] == False
        assert len(file["warnings"]) > 0


def lint_qml(filename: str, debug=False):
    result = invoke_qmllint_py(["--json", "-", get_assets_path(filename)])
    if debug:
        print(f"\nreturncode:")
        print(result.returncode)
        print(f"\nstdout:")
        print(json.dumps(json.loads(result.stdout.decode("utf-8")), indent=2))
    return result


def invoke_qmllint_py(args: list[str]):
    return subprocess.run(
        ["poetry", "run", "python", "qmllint.py", *args],
        cwd=SCRIPTS_DIR,
        capture_output=True,
    )


def parse_json(string: str):
    return json.loads(
        string, object_hook=lambda d: collections.defaultdict(lambda: None, d)
    )


@pytest.fixture
def schema():
    with open(get_assets_path("schema.json")) as f:
        return json.load(f)


def get_assets_path(filename: str):
    return os.path.join(ASSETS_DIR, "qml", filename)


class QmlLintFileResult(typing.TypedDict):
    filename: str
    success: bool
    warnings: list


class QmlLintResult(typing.TypedDict):
    files: list[QmlLintFileResult]
    revision: int
