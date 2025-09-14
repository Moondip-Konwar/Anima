import json
import sys


def get_args():
    """
    Parse command-line arguments passed from Tauri/JS.

    Automatically attempts to JSON-decode each argument if it's valid JSON.
    Returns a list of arguments where JSON strings are converted to Python
    objects (dicts/lists).

    Example:
        $ python script.py arg1 '{"foo": "bar"}'
        -> ["arg1", {"foo": "bar"}]
    """
    raw_args = sys.argv[1:]
    parsed_args = []
    for arg in raw_args:
        try:
            parsed_args.append(json.loads(arg))
        except json.JSONDecodeError:
            parsed_args.append(arg)
    return parsed_args


def send_result(data):
    """
    Print Python data (list, dict, string, etc.) as valid JSON.

    This is the only function you need to call at the end of your script
    to return data back to JS.

    Example:
        send_result(["ok", {"foo": "bar"}])
    """
    print(json.dumps(data))
