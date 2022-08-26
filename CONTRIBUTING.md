# How to Contribute

## Getting Started

- Ensure you have correct version of Node.js installed (see `.tool-versions`)
- Ensure you have correct version of Python installed (see
  `python/pyproject.toml`).
- Ensure you have Poetry installed.
- Run `npm ci` to install all dependencies.

## Run Tests

### Node.js (Extension Host)

```sh
npm test
```

### Python (Scripts)

```sh
cd python
pytest
```

## Lint Source Codes

### Node.js (Extension Host)

```sh
npm run lint
```

### Python (Scripts)

```sh
cd python
pylint scripts
```
