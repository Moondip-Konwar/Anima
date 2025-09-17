import os
import urllib.request

from utils import get_args, send_result


def main():
    args = []
    try:
        # Parse arguments
        args = get_args()
        if len(args) < 2:
            raise ValueError(
                f"Expected at least 2 arguments (link, destination), got {len(args)}: {args}"
            )

        link = args[0]
        destination = args[1]
        name = args[2] if len(args) >= 3 else None

        # Ensure destination folder exists
        os.makedirs(destination, exist_ok=True)

        # Determine filename
        if not name:
            name = os.path.basename(link)
        else:
            ext = os.path.splitext(link)[1]  # preserve original extension
            if not name.endswith(ext):
                name += ext

        filepath = os.path.join(destination, name)

        # Check if file exists
        if os.path.exists(filepath):
            send_result({"status": "exists", "file": filepath})
            return

        # Download the image
        urllib.request.urlretrieve(link, filepath)

        # Send success result
        send_result({"status": "ok", "file": filepath})

    except Exception as e:
        send_result(
            {
                "status": "error",
                "message": str(e),
                "type": type(e).__name__,
                "args": args,
            }
        )


if __name__ == "__main__":
    main()
