import json

from utils import get_args, send_result

# Reads a JSON file and returns its parsed content
# python3 read.py [file]
# Output: Parsed JSON content from [file]


def main():
    filename = get_args()[0]
    with open(filename, "r") as f:
        data = json.load(f)  # Load JSON, not raw text
        send_result(data)


if __name__ == "__main__":
    main()
