STR="a {b}"
REMOVED=$(echo $STR | sed "s/[{][^)]*[}]//g")
echo "${REMOVED}?name=vscode-qt-for-python-"