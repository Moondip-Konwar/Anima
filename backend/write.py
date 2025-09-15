import json

from utils import get_args, send_result

# Writes data to a JSON file
# python3 write.py [file] [data]
# Example:
#   python3 write.py data.json '{"hello": "world"}'
# Output:
#   {"status": "ok", "written_to": "data.json"}


def main():
    # Get arguments: filename (str) and data (object)
    filename, data = get_args()

    # Write JSON data into the file
    with open(filename, "w") as f:
        json.dump(data, f, indent=2)

    # Send a confirmation back
    send_result({"status": "ok", "written_to": filename})


if __name__ == "__main__":
    main()
