import collections
import json
import os
import subprocess
import typing

from tests import ASSETS_DIR, SCRIPTS_DIR


def test_qmllint_version():
    result = invoke_qmllint_py(["-v"])
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


def test_qmllint_pass_qml():
    filename = "pass.qml"
    result = lint_qml(filename)
    assert result.returncode == 0

    parsed: QmlLintResult = parse_json(result.stdout.decode("utf-8"))
    assert len(parsed["files"]) == 1

    file = parsed["files"][0]
    assert os.path.abspath(file["filename"]) == get_assets_path(filename)
    assert file["success"] == True
    assert file["warnings"] == []


def test_qmllint_missing_import_qml():
    filename = "missing_import.qml"
    result = lint_qml(filename)
    assert result.returncode != 0

    parsed: QmlLintResult = parse_json(result.stdout.decode("utf-8"))
    assert len(parsed["files"]) == 1

    file = parsed["files"][0]
    assert os.path.abspath(file["filename"]) == get_assets_path(filename)
    assert file["success"] == False
    assert len(file["warnings"]) > 0

    for warning in file["warnings"]:
        assert type(warning["charOffset"]) in (int, type(None))
        assert type(warning["column"]) in (int, type(None))
        assert type(warning["length"]) in (int, type(None))
        assert type(warning["line"]) in (int, type(None))
        assert type(warning["message"]) == str
        assert type(warning["suggestions"]) == list
        assert warning["type"] == "warning"


def test_qmllint_unknown_import_qml():
    filename = "unknown_import.qml"
    result = lint_qml(filename)
    assert result.returncode != 0

    parsed: QmlLintResult = parse_json(result.stdout.decode("utf-8"))
    assert len(parsed["files"]) == 1

    file = parsed["files"][0]
    assert os.path.abspath(file["filename"]) == get_assets_path(filename)
    assert file["success"] == False
    assert len(file["warnings"]) > 0

    for warning in file["warnings"]:
        assert type(warning["charOffset"]) in (int, type(None))
        assert type(warning["column"]) in (int, type(None))
        assert type(warning["length"]) in (int, type(None))
        assert type(warning["line"]) in (int, type(None))
        assert type(warning["message"]) == str
        assert type(warning["suggestions"]) == list
        assert warning["type"] == "warning"


def test_qmllint_syntax_error_qml():
    filename = "syntax_error.qml"
    result = lint_qml(filename)
    assert result.returncode != 0

    parsed: QmlLintResult = parse_json(result.stdout.decode("utf-8"))
    assert len(parsed["files"]) == 1

    file = parsed["files"][0]
    assert os.path.abspath(file["filename"]) == get_assets_path(filename)
    assert file["success"] == False
    assert len(file["warnings"]) > 0

    for warning in file["warnings"]:
        assert type(warning["charOffset"]) in (int, type(None))
        assert type(warning["column"]) in (int, type(None))
        assert type(warning["length"]) in (int, type(None))
        assert type(warning["line"]) in (int, type(None))
        assert type(warning["message"]) == str
        assert type(warning["suggestions"]) == list
        assert warning["type"] == "critical"


def test_qmllint_multiline_string_qml():
    filename = "multiline_string.qml"
    result = lint_qml(filename)
    assert result.returncode == 0

    parsed: QmlLintResult = parse_json(result.stdout.decode("utf-8"))
    assert len(parsed["files"]) == 1

    file = parsed["files"][0]
    assert os.path.abspath(file["filename"]) == get_assets_path(filename)
    assert file["success"] == True
    assert len(file["warnings"]) == 1

    for warning in file["warnings"]:
        assert type(warning["charOffset"]) in (int, type(None))
        assert type(warning["column"]) in (int, type(None))
        assert type(warning["length"]) in (int, type(None))
        assert type(warning["line"]) in (int, type(None))
        assert type(warning["message"]) == str
        assert type(warning["suggestions"]) == list
        assert warning["type"] == "info"


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


def get_assets_path(filename: str):
    return os.path.join(ASSETS_DIR, "qml", filename)


def parse_json(string: str):
    return json.loads(
        string, object_hook=lambda d: collections.defaultdict(lambda: None, d)
    )


class QmlLintWarning(typing.TypedDict):
    charOffset: int | None
    column: int
    length: int
    line: int
    message: str
    suggestions: list
    type: (
        typing.Literal["info"] | typing.Literal["warning"] | typing.Literal["critical"]
    )


class QmlLintFileResult(typing.TypedDict):
    filename: str
    success: bool
    warnings: list[QmlLintWarning]


class QmlLintResult(typing.TypedDict):
    files: list[QmlLintFileResult]
    revision: int
