import json
import os

from utils import get_args, send_result

# import sys

# Writes data to a JSON file
# python3 write.py [file] [data]
# Example:
#   python3 write.py data.json '{"hello": "world"}'
# Output:
#   {"status": "ok", "written_to": "data.json"}


def main():
    args = []
    try:
        # Get arguments: filename (str) and data (object)
        args = get_args()
        if len(args) != 2:
            raise ValueError(
                f"Expected 2 arguments (filename, data), got {len(args)}: {args}"
            )

        filename, data = args

        # Make path absolute relative to this script
        script_dir = os.path.dirname(os.path.abspath(__file__))
        filepath = os.path.join(script_dir, filename.lstrip("/"))

        # Ensure parent directories exist
        os.makedirs(os.path.dirname(filepath), exist_ok=True)

        # Write JSON data into the file
        with open(filepath, "w") as f:
            json.dump(data, f, indent=2)

        # Send confirmation
        send_result({"status": "ok", "written_to": filepath})

    except Exception as e:
        # Catch any error and send back for debugging
        send_result(
            {
                "status": "error",
                "message": str(e),
                "type": type(e).__name__,
                "args": args if "args" in locals() else [],
            }
        )


if __name__ == "__main__":
    main()
