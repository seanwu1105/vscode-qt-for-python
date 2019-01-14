import argparse
import pathlib
import json

from bs4 import BeautifulSoup
import requests


def write_json(f):
    def ret(*args, **kwargs):
        will_write = kwargs.pop("json")
        result = f(*args, **kwargs)
        if will_write:
            fn = pathlib.Path(__file__).parent.joinpath(f.__name__ + '.json')
            with fn.open(mode='w') as json_file:
                json.dump(result, json_file)
        else:
            print(result)
        return result
    return ret


def request(url):
    def decorator(f):
        def ret(*args, **kwargs):
            r = requests.get(url)
            if r.status_code == requests.codes.ok:
                soup = BeautifulSoup(r.text, 'html.parser')
                kwargs['soup'] = soup
                return f(*args, **kwargs)
            raise RuntimeError(f'Cannot request in {f.__name__} '
                               f'(status: {r.status_code})')
        return ret
    return decorator


def main():
    parser = argparse.ArgumentParser(
        description='Fetch the spec of Qt-related language or file formats.')
    parser.add_argument('targets',
                        nargs='+',
                        choices=['qml_data_types', 'styable_widgets',
                                 'qss_properties', 'qss_icons',
                                 'qss_properties_types', 'qss_pseudo_states',
                                 'qss_subcontrols'],
                        help='the fetching target')
    parser.add_argument('--json', action='store_true')
    args = parser.parse_args()

    for target in args.targets:
        globals()['fetch_' + target](json=args.json)


@request('http://doc.qt.io/qt-5/qtqml-typesystem-basictypes.html')
@write_json
def fetch_qml_data_types(soup=None):
    return {
        'QML Language': tuple(i.get_text() for i in (
            find_text(soup('h3', recursive=True),
                      'Basic Types Provided By The QML Language')
            .find_next('table')
            .find_all('td', class_='tblName')
        )),
        'QML Modules': tuple(i.get_text() for i in (
            find_text(soup('h3', recursive=True),
                      'Basic Types Provided By QML Modules')
            .find_next('table')
            .find_all('td', class_='tblName')
        ))
    }


@request('http://doc.qt.io/qt-5/stylesheet-reference.html')
@write_json
def fetch_styable_widgets(soup=None):
    return tuple(tr.find('td').get_text().strip() for tr in (
        soup
        .find('h2', id='list-of-stylable-widgets', recursive=True)
        .find_next('table')
        .find_all('tr')
    ) if tr.find('td'))


@request('http://doc.qt.io/qt-5/stylesheet-reference.html')
@write_json
def fetch_qss_properties(soup=None):
    return tuple(tr.find('td').get_text().strip() for tr in (
        soup
        .find('h2', id='list-of-properties', recursive=True)
        .find_next('table')
        .find_all('tr')
    ) if tr.find('td'))


@request('http://doc.qt.io/qt-5/stylesheet-reference.html')
@write_json
def fetch_qss_icons(soup=None):
    return tuple(tr.find('td').get_text().strip() for tr in (
        soup
        .find('h2', id='list-of-icons', recursive=True)
        .find_next('table')
        .find_all('tr')
    ) if tr.find('td'))


@request('http://doc.qt.io/qt-5/stylesheet-reference.html')
@write_json
def fetch_qss_properties_types(soup=None):
    return tuple(tr.find('td').get_text().strip() for tr in (
        soup
        .find('h2', id='list-of-property-types', recursive=True)
        .find_next('table')
        .find_all('tr')
    ) if tr.find('td'))


@request('http://doc.qt.io/qt-5/stylesheet-reference.html')
@write_json
def fetch_qss_pseudo_states(soup=None):
    return tuple(tr.find('td').get_text().strip() for tr in (
        soup
        .find('h2', id='list-of-pseudo-states', recursive=True)
        .find_next('table')
        .find_all('tr')
    ) if tr.find('td'))


@request('http://doc.qt.io/qt-5/stylesheet-reference.html')
@write_json
def fetch_qss_subcontrols(soup=None):
    return tuple(tr.find('td').get_text().strip() for tr in (
        soup
        .find('h2', id='list-of-sub-controls', recursive=True)
        .find_next('table')
        .find_all('tr')
    ) if tr.find('td'))


# TODO: fetch all global color names defined in: http://doc.qt.io/qt-5/qt.html#GlobalColor-enum
@request('http://doc.qt.io/qt-5/qt.html')
@write_json
def fetch_color_names(soup=None):
    raise NotImplementedError('TODO: fetch all global color names defined in: '
                              'http://doc.qt.io/qt-5/qt.html#GlobalColor-enum')


def find_text(elements, text):
    for element in elements:
        if element.get_text() == text:
            return element
    return None


if __name__ == '__main__':
    main()
